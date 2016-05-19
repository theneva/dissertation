### The reference system: BeerFave

Measuring quality of microservice deployment requires a reference system comprising multiple services. The app _BeerFave_ was built to accommodate this. Keeping the system as close to realistic as possible is important for the findings' validity [TODO REFERENCE TO OATES maybe?]. Many popular applications can be generalised (although greatly simplified in the process) to:

- storage and authentication of __users__;
- a collection of __items__ (e.g., posts on a social medium); and
- a set of __links__ between _items_ and _users_, e.g. "saving" an _item_ for later access.

TODO: fix tense about BeerFave (future tense later)

BeerFave is a relatively simple system consisting of these three services; a public-facing API to tie the services together and expose their functionality; and a web application to consume and manipulate the data contained in the services.

One key concern for any microservice system is _standardisation_ on languages and platforms. It is certainly an organisational problem: teams consist of people who are typically fluent in a small set of programming languages. However, the configuration required to automate deployment of the services is another considerable factor.
TODO Where is this sentence going?

Technical requirements for the application were modelled in part to allow efficient testing of as many elements of the framework as possible.

1. At least two services must be written in the same language.
2. At least one service must be written in a different language, but run on the same runtime as at least one other service.
3. At least one service must be written for a different runtime from all other services.
4. The web application must be composed entirely of static assets (i.e., HTML, CSS, and JavaScript) and served directly from the file system with an HTTP server (such as _nginx_^[http://nginx.org]) with no regard for _what_ it serves.
5. At least two services must use different Database Management Systems (DBMS).
6. The system will be run on both a self-hosted Linux environment and with a _Platform as a Service_ (PaaS) provider.

These technical requirements will allow testing each deployment strategy's flexibility and independence in terms of two important factors: first, the execution environment, such as a Platform as a Service with unknown underlying technology, or a self-hosted Linux or Windows server; second, programming language and frameworks.

TODO: ^ this is a dumb way to say it

#### Communication

All services are committed to the popular REpresentational State Transfer (REST) architectural style. The services aim to meet the requirements for level 2 compliance (3 being the highest) with the Richardson Maturity Model^[The Richardson Maturity model is a pyramid of technical requirements for REST split into three levels, each denoting a higher level of compliance with the REST paradigm. TODO: briefly explain the levels? The well-known Martin Fowler has written an article available on http://martinfowler.com/articles/richardsonMaturityModel.html for more details.]. The specific style for communication (for example Remote Procedure Calls (SOAP over HTTP and RPC over TCP) being common alternatives) is not important for the actual deployment process, but instead a question of how the teams wish to expose their data.

TODO:

- RPC is a "concept", don't say that "RPC" is over TCP
- AC liker ikke "data transfer format", skriv "data representation used for transfer"

![The Richardson Maturity Model](http://martinfowler.com/articles/images/richardsonMaturityModel/overview.png)

The Richardson Maturity Model (from http://martinfowler.com/articles/richardsonMaturityModel.html).

REST does not impose any requirements on the data transfer format. The two main candidates are usually JavaScript Object Notation (JSON) and eXtensible Markup Language (XML). JSON was selected for two reasons: first, its brevity compared to XML, reducing load times; second, its ease of translation to and from JavaScript objects, which becomes important when transferring great amounts of data between a server and a web client: developers have little control over the web browser, which both encodes and decodes data for transfer. Both factors are likely insignificant in an application with small amounts of data, but the native JSON support in JavaScript still makes JSON more attractive than XML. Notably, the author of Building Microservices, prefers XML; there are certainly arguments to be made for both sides.

TODO: really long sentence

With JSON, a response to an HTTP GET request to a resource `/beers/1` may be:

```json
{
  "id": 1,
  "name": "Amundsen Pale Ale",
  "category": "Pale Ale",
  "description": "Norway's best Pale Ale"
}
```

A third candidate growing in popularity is GraphQL and Relay, recently published by Facebook^[https://facebook.github.io/react/blog/2015/02/20/introducing-relay-and-graphql.html]. GraphQL is designed to simplify querying complex nested data structures, and challenges the now-established URL-centric paradigm that REST is a part of. Instead of using separate URLs to distinguish users, GraphQL uses a single (or a few) endpoints and allows the client to formulate a query in a JSON-like format---very similar to how Simple Object Access Protocol works, but without envelopes and ties to a specific data transfer format. A typical GraphQL query may look like the following, and the response may simply be a JSON object with data for the specified fields^[https://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html].

```graphql
{
  user(id: 3500401) {
    id,
    name,
    isViewerFriend,
    profilePicture(size: 50)  {
      uri,
      width,
      height
    }
  }
}
```

The system is largely based around two runtimes: the Java Virtual Machine (JVM), which is designed to run bytecode compiled from the Java programming language; and the popular JavaScript server runtime Node.js. Both the JVM and Node.js have cross-platform support, allowing all services to be deployed to a virtual Linux host. The specific services were implemented as follows, with three Clojure applications, one Java application, one Node.js application, and one static JavaScript web browser application. Clojure is compiled to JVM bytecode and executed on the JVM.

| Application | Role | Dependencies | Language | Runtime
| ------------ | -------------------------------- | --------------------- | ---------- | ---------
| Beer list service | All stored beers | - | Java | JVM
| User service | Stored users; Authentication | - | Clojure | JVM
| Favorites service | Users' _faved_ beers | Beer list; Users | Clojure | JVM
| API Gateway | Ties the microservices together | Beer list; User; Favorites | JavaScript | Node.js
| Web application | Web user interface: the "app" | Public API | JavaScript (with React) | The end user's web browser

The implementation is presented in Figure @fig:beerfave-endpoints.

TODO: citation is fucked up

![BeerFave endpoints](http://img.ctrlv.in/img/16/05/09/572fd4f854fb2.png){#fig:beerfave-endpoints}

In this small example application, each microservice only exposes a single database relation: the model in @fig:beerfave-endpoints can be mapped directly to an Entity Attibute Relationship diagram, like in Figure @fig:beerfave-ear-diagram. However, this is no rule: each microservice may contain an arbitrarily complex data model. For example, a microservice can be implemented for recommending new beers to the user. The recommendation microservice may track the user's habits, and use machine learning algorithms to compute which beers will best fit the user's tastes. Giving the user an option to decline a recommendation adds another relation to the recommendation engine.

TODO: References ^ are fucked up.

![BeerFave EAR diagram](http://img.ctrlv.in/img/16/05/09/572fcdd81caca.png){#fig:beerfave-ear-diagram}

![Beer list (as JSON) from the beer microservice](http://img.ctrlv.in/img/16/04/16/5712757db9f02.png){#fig:beer-list-json}

TODO: FIX THIS, IT'S NOT JSON AND GET RID OF "THE WIFEBEATER"

![The Web interface](http://img.ctrlv.in/img/16/04/16/5712755b3f165.png){#fig:the-web-interface}

![A comparison of database types from https://github.com/cochroachdb/cockroach](https://raw.githubusercontent.com/cockroachdb/cockroach/master/resource/doc/sql-nosql-newsql.png?raw=true){#fig:database-discussion}

TODO:

- Summarise this chapter
- Introduce the next chapter
