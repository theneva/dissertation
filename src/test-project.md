# Test project

## The reference system: BeerFave

Measuring quality of microservice deployment requires a reference system comprising multiple services. The app _BeerFave_ was built to accommodate this. Keeping the system as close to realistic as possible is important for the findings' validity [TODO REFERENCE TO OATES maybe?]. Many popular applications can be generalised (although greatly simplified in the process) to:

- storage and authentication of __users__;
- a collection of __items__ (e.g., posts on a social medium); and
- a set of __links__ between _items_ and _users_, e.g. "saving" an _item_ for later access.

BeerFave is a comparatively simple system consisting of these three services; a public-facing API to tie the services together and expose their functionality; and a web application to consume and manipulate the data contained in the services.

One key concern for any microservice system is _standardisation_ on languages and platforms. It is certainly an organisational problem: teams consist of people who are typically fluent in a comparatively small set of programming languages. However, the configuration required to automate deployment of the services is another considerable factor.
TODO I don't know where I'm going with this sentence

Technical (non-functional) requirements for the application were modelled in part to allow efficient testing of as many elements of the framework as possible.

1. At least two services must be written in the same language.
2. At least one service must be written in a different language, but run on the same platform as at least one other service.
3. At least one service must be written for a different platform from all other services.
4. The web application must be composed entirely of static assets (i.e., HTML, CSS, and JavaScript) and served directly from the file system with a pure HTTP server (such as nginx^[http://nginx.org/ with no regard for _what_ it serves.
5. At least two services must use different Database Management Systems (DBMS).
6. The system will be run on both a self-hosted Linux environment and with a Platform as a Service (PaaS) provider.

These non-functional requirements will allow testing each deployment strategy's flexibility and independence in terms of two important factors: First, the execution environment, such as a Platform as a Service with unknown underlying technology, or a self-hosted Linux or Windows server. Second, programming language and frameworks. Even though standardisation is still an organisational concern, it will be interesting to know the impact of each strategy from a technical viewpoint.

### Communication

TODO: Does this belong in the "background" chapter? tl;dr it doesn't matter what you use, I went with REST.

All services are committed to the popular REpresentational State Transfer (REST) architectural style. The services aim to meet the requirements for level 2 (3 being the highest) compliance with the Richardson Maturity Model^[The Richardson Maturity model is a pyramid of technical requirements for REST split into three levels, each denoting a higher level of compliance with the REST paradigm. TODO: briefly explain the levels? The well-known Martin Fowler has written an article available on http://martinfowler.com/articles/richardsonMaturityModel.html for more details.]. The specific style for communication (for example Remote Procedure Calls (SOAP over HTTP and RPC over TCP) being common alternatives) is not important for the actual deployment process, but instead a question of how the teams wish to expose their data.

![The Richardson Maturity Model](http://martinfowler.com/articles/images/richardsonMaturityModel/overview.png)

The Richardson Maturity Model (from http://martinfowler.com/articles/richardsonMaturityModel.html).

REST does not impose any requirements on the data transfer format. The two main candidates are usually JavaScript Object Notation (JSON) and eXtensible Markup Language (XML). I chose JSON for two reasons: first, its brevity compared to XML, reducing load times; second, its ease of translation to and from JavaScript objects, which becomes important when transferring great amounts of data between a server and a web client: developers have little control over the web browser, which both encodes and decodes data for transfer. Both factors are likely insignificant in an application with small amounts of data, but the native JSON support in JavaScript still makes JSON more attractive than XML. Notably, the author of Building Microservices, prefers XML; there are certainly arguments to be made for both sides.

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

The system is largely around two runtimes: the Java Virtual Machine (JVM), which is designed to run bytecode compiled from the Java programming language; and the popular JavaScript server runtime Node.js. Both the JVM and Node.js have cross-platform support, allowing all services to be deployed to a virtual Linux host. The specific services were implemented follows, with (1) three Clojure applications, (2) one Java application, (3) one Node.js application, and (4) one static JavaScript web browser application. Clojure is compiled to JVM bytecode and executed on the JVM.

| Service | Role | Dependencies | Language | Runtime
| ------------ | -------------------------------- | --------------------- | ---------- | ---------
| Beer list | All stored beers | - | Java 8 | JVM
| Users | Stored users; Authentication | - | Clojure | JVM
| Favourites | Users' _faved_ beers | Beer list; Users | Clojure | JVM
| Public API | Ties the microservices together | __All of the above__ | JavaScript | Node.js
| Web application | Web user interface: the "app" | Public API | JavaScript (with React) | The end user's web browser

The implementation is presented in Figure @fig:beerfave-endpoints.

![BeerFave endpoints](http://img.ctrlv.in/img/16/05/09/572fd4f854fb2.png){#fig:beerfave-endpoints}

In this small example application, each microservice only exposes a single database relation: the model in @fig:beerfave-endpoints can be mapped directly to an Entity Attibute Relationship diagram, like in Figure @fig:beerfave-ear-diagram. However, this is no _rule_: each microservice can contain an arbitrarily complex data model. For example, a microservice can be implemented for recommending new beers to the user. The recommendation microservice may track the user's habits, and use machine learning algorithms to compute which beers will best fit the user's tastes. Giving the user an option to decline a recommendation adds another relation to the recommendation engine.

![BeerFave EAR diagram](http://img.ctrlv.in/img/16/05/09/572fcdd81caca.png){#fig:beerfave-ear-diagram}

![Beer list (as JSON) from the beer microservice](http://img.ctrlv.in/img/16/04/16/5712757db9f02.png){#fig:beer-list-json}

![The Web interface](http://img.ctrlv.in/img/16/04/16/5712755b3f165.png){#fig:the-web-interface}

![A comparison of database types from https://github.com/cochroachdb/cockroach](https://raw.githubusercontent.com/cockroachdb/cockroach/master/resource/doc/sql-nosql-newsql.png?raw=true){#fig:database-discussion}

## Limitations of this implementation approach

BeerFave aims to cover as much ground as possible. Even so, it is still a small, isolated reference application never executed in a real world scenario. This brings a few limitations to how the results may be interpreted.

Perhaps most importantly, BeerFave is implemented by a single developer outside any organisation. As a direct result, the lone developer is responsible for deployments. This firmly separates the DevOps process from the real world, as there are no other teams---or even team _members_---to account for. Further, there is only one live system besides the local development environment. This makes it hard to say anything about various Environments like _production_ and _test_. Finally, restraints such as the use of Long-Term Service (LTS) software versions such as Node.js v4.2.x Argon are not considered. This means that recent updates to the software may cause results to differ. The issue of LTS versions may be especially prominent in the JavaScript and Node.js community, where new language features are being added frequently. As an example, Node.js v4.2.x (LTS) was announced in October 2015^[https://nodejs.org/en/blog/release/v4.2.0/], and v6.0.0 with heavily improved support for new JavaScript language features was announced in April 2016^[https://nodejs.org/en/blog/release/v6.0.0/].

The framework will only be tested on a single case, which is a small and isolated system in a controlled environment. This means that the framework will only be "proven" for this specific case; it will take multiple projects to say anything about the generalisability of the framework with respect to systems of different sizes.

For practicality, this implementation ignores the Microsoft stack. For example, standardising deployment of all applications to a single virtual server (a common case for many companies) would be very difficult. This may change in the near future with Microsoft's work on opening the source code of .NET Core^[https://blogs.msdn.microsoft.com/dotnet/2014/11/12/net-core-is-open-source, https://github.com/Microsoft/dotnet], but it is still very much a work in progress at the time of writing. This means that the results from this study may not be applicable to projects utilising the Microsoft technology stack.

Execution environments are a key theme in this thesis, but have very limited representation. The self-hosted deployments are only tested on the popular Linux distribution Ubuntu 15.10 (Wily Werewolf, released October 2015). There are many other popular Linux server distributions, including Debian^[https://www.debian.org/] (which is the basis for Ubuntu), Red Hat^[https://www.redhat.com/en/technologies/linux-platforms], and the minimalistic operating system CoreOS^[https://coreos.com/] which is designed specifically to run App Containers such as Docker or rkt^[https://github.com/coreos/rkt]. Furthermore, server distributions of Mac OSX and Microsoft Windows are popular as well, but not considered here.

Despite the Framework aiming to be applicable for both small and large businesses, BeerFave will never see any large data sets nor any real server load. Thus, it cannot be guaranteed that any given deployment implementation provides acceptable execution performance. Indeed, the findings in this thesis are largely based on the assumption that access to memory and storage space go beyond any real concern in context of deployment. Additionally, data transfer speeds and issues such as pagination of long responses are ignored.

There are also some interesting aspects to consider that are outside the scope of this study. One example is the idea of _universal web apps_, where the layout markup (e.g., HTML) is partly rendered on the server side before being sent to the client. At present, this idea is entirely focused on the web API and client, whereas the focus of this thesis is on the overall microservice context. In time, however, some form of this idea may see use in microservices beyond a web API.
