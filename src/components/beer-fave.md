Measuring quality of microservice deployment requires a reference system comprising multiple services. The app _BeerFave_ was built to accommodate this. Keeping the system as close to realistic as possible is important for the findings' validity. Many popular applications can be generalised (although greatly simplified in the process) to:

- storage and authentication of __users__;
- a collection of __items__ (e.g., posts on a social medium); and
- a set of __links__ between _items_ and _users_, e.g. "saving" an _item_ for later access.

BeerFave is a relatively simple system consisting of these three services; a public-facing API to tie the services together and expose their functionality; and a web application to consume and manipulate the data contained in the services.

One key concern for any microservice system is _standardisation_ on languages and platforms. It is certainly an organisational problem: teams consist of people who are typically fluent in a small set of programming languages. However, the configuration required to automate deployment of the services is another considerable factor. Services are implemented in multiple languages that run on distinct platforms to allow testing this characteristic.

Technical requirements for the application were modelled in part to allow efficient testing of as many elements of the framework as possible.

```include
src/components/beerfave-technical-requirements.md
```

These technical requirements will allow testing each deployment strategy's flexibility and independence in terms of two important factors: the runtime, and the programming language and frameworks.

### Communication

All services are committed to the popular REpresentational State Transfer (REST) architectural style. The services aim to meet the requirements for level 2 compliance (3 being the highest) with the Richardson Maturity Model. The Richardson Maturity model is a pyramid of technical requirements for REST split into three levels, each denoting a higher level of compliance with the REST paradigm. The specific style for communication---SOAP and HTTP being common alternatives---is not important for the actual deployment process, but instead a question of how the teams wish to expose their data. The model is visualised in Figure @fig:richardson-maturity-model, reproduced entirely from http://martinfowler.com/articles/richardsonMaturityModel.html.

![The Richardson Maturity Model (reproduced from Martin Fowler's article^[http://martinfowler.com/articles/richardsonMaturityModel.html])](http://martinfowler.com/articles/images/richardsonMaturityModel/overview.png){#fig:richardson-maturity-model width=100%}

REST does not impose any requirements on the data representation. The two main candidates for serialisation are usually JavaScript Object Notation (JSON) and eXtensible Markup Language (XML). JSON was selected for two reasons: first, its brevity compared to XML, reducing load times; second, its ease of translation to and from JavaScript objects. This becomes important when transferring large amounts of data between a server and a web client: developers have little control over the web browser, which is required to both serialise and deserialise data when communicating with the server. Both factors are likely insignificant in an application with small amounts of data, but the native JSON support in JavaScript still makes JSON more attractive than XML in the BeerFave system.

With JSON, a response to an HTTP GET request to a single beer resource `/beers/1` may be:

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

![BeerFave endpoints](http://img.ctrlv.in/img/16/05/09/572fd4f854fb2.png){#fig:beerfave-endpoints width=100%}

In this small example application, each microservice only exposes a single database relation: the model in @fig:beerfave-endpoints can be mapped directly to an Entity Attibute Relationship diagram, like in Figure @fig:beerfave-ear-diagram. However, this is no rule: each microservice may contain an arbitrarily complex data model. For example, a microservice can be implemented for recommending new beers to the user. The recommendation microservice may track the user's habits, and use machine learning algorithms to compute which beers will best fit the user's tastes. Giving the user an option to decline a recommendation adds another relation to the recommendation engine.

![BeerFave EAR diagram](http://img.ctrlv.in/img/16/05/09/572fcdd81caca.png){#fig:beerfave-ear-diagram width=100%}

A sample screenshot of the web interface is displayed in Figure @fig:the-web-interface.

![The Web interface](http://img.ctrlv.in/img/16/04/16/5712755b3f165.png){#fig:the-web-interface width=100%}
