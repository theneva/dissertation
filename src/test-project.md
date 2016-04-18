# Test project

## The reference system

In order to test deployment, I built a comparatively simple system consisting of four microservices, one API to tie them together, and one web application to consume and manipulate the data. I modelled the technical requirements for the system in part after the framework. This allowed testing as many of the requirements as possible in an efficient manner.

### Communication

All applications are committed to the REpresentational State Transfer (REST) paradigm^[TODO or is it an architectural style?] over HyperText Transfer Protocol (HTTP) for communication, meeting the requirements for level 2 (3 being the highest) compliance with the Richardson Maturity Model^[The Richardson Maturity model is a pyramid of technical requirements for REST split into three levels, each denoting a higher level of compliance with the REST paradigm. TODO: briefly explain the levels? The well-knwon Martin Fowler has written an article avaialble on http://martinfowler.com/articles/richardsonMaturityModel.html for more details.]. The specific style for communication (for example Remote Procedure Calls (SOAP over HTTP and RPC over TCP) being common alternatives) is not important for the actual deployment process, but instead a question of how the teams wish to expose their data.

REST does not impose any requirements on the data transfer format. The two main candidates are usually JavaScript Object Notation (JSON) and eXtensible Markup Language (XML). I chose JSON for two reasons: first, its brevity compared to XML, reducing load times; second, its ease of translation to and from JavaScript objects, important when transferring great amounts of data between a server and a web client: as developers, we have little control over the web browser, which both encodes and decodes data. Both factors are likely insignificant in an application with small amounts of data, but the native JSON support in JavaScript makes JSON more attractive over XML. Notably, the author of Building Microservices, prefers XML; there are certainly arguments for both sides. Facebook has recently released GraphQL and Relay, which are interesting alternatives to the now-established 

![The Richardson Maturity Model](http://martinfowler.com/articles/images/richardsonMaturityModel/overview.png)

The Richardson Maturity Model (from http://martinfowler.com/articles/richardsonMaturityModel.html).

Standardisation on languages and platforms is certainly an organisational concern: teams consist of people who typically only know a comparatively small set of programming languages well. However, the configuration required to automate deployment of the services may also be a considerable factor, Thus, I have defined the following requirements for the system:

1. At least two services must be written in the same language.
2. At least one service must be written in a different language, but run on the same platform as at least one other service.
3. At least one service must be written for a different platform from all other services.
4. The web application must be composed entirely of static assets (i.e., HTML, CSS, and JavaScript) and served directly from the file system with a pure HTTP server (such as [nginx](http://nginx.org/) with no regard for _what_ it serves.

I decided against writing anything using the Microsoft stack for practical reasons: for example, standardising deployment of all applications to a single virtual server (a common case for many companies) would be very difficult. This may change in the near future with Microsoft's work on opening .NET Core's source code^[https://blogs.msdn.microsoft.com/dotnet/2014/11/12/net-core-is-open-source, https://github.com/Microsoft/dotnet], but it is still very much a work in progress at the time of writing. This means that the results from this study may not be applicable to projects utilising the Microsoft technology.

I based the system around the Java Virtual Machine (JVM) designed to run bytecode compiled from the Java programming language, and the popular JavaScript runtime Node.js. This allows all services to be deployed to a virtual Linux host. The specific services were implemented follows, with (1) three Clojure applications, (2) one Java application, (3) one Node.js application, and (4) one static JavaScript web browser application:

- Beer list service (independent; written in Java 8; running on the JVM)
- Users and authentication service (independent; written in Clojure; compiled to JVM bytecode and thus running on the JVM)
- Favourites service (dependent on the beer list service and the users service; written in Clojure and thus running on the JVM)
- Faux beer recommendation service (dependent on the beer list service and the favourites service, and the users service; written in Clojure and thus running on the JVM)
- Public API tying the microservices together (dependent on all of the above; written in JavaScript; running on Node.js)
- Web application (dependent on the public API; written in JavaScript (with React); running in the end user's browser)

(TODO make a figure of services with languages and platforms)

![Beer list from the beer microservice](http://img.ctrlv.in/img/16/04/16/5712757db9f02.png)

Beer list (as JSON) from the beer microservice.

![Web interface](http://img.ctrlv.in/img/16/04/16/5712755b3f165.png)

The web interface.

## Interesting problems yet to be considered

- Universal web apps: asynchronously updating the API and web application
