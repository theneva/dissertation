# Test project

## The reference system: BeerFave

In order to test microservice deployment, a reference system comprising multiple services is required. The app _BeerFave_ was built to accommodate this. BeerFave is a comparatively simple system consisting of the following services:

- four small services;
- one API to tie them together; and
- and one web application to consume and manipulate the data.

One key concern for any microservice system is _standardisation_ on languages and platforms. It is certainly an organisational problem: teams consist of people who are typically fluent in a comparatively small set of programming languages. However, the configuration required to automate deployment of the services may also be a considerable factor, and so some 

Technical (non-functional) requirements for the application were modelled in part to allow efficient testing of as many parts of the framework as possible. 

1. At least two services must be written in the same language.
2. At least one service must be written in a different language, but run on the same platform as at least one other service.
3. At least one service must be written for a different platform from all other services.
4. The web application must be composed entirely of static assets (i.e., HTML, CSS, and JavaScript) and served directly from the file system with a pure HTTP server (such as [nginx](http://nginx.org/) with no regard for _what_ it serves.
5. At least two services must use different Database Management Systems (DBMS).
6. The system will be run on both a self-hosted Linux environment and with a Platform as a Service (PaaS) provider.

These non-functional requirements will allow testing each deployment strategy's flexibility and independence in terms of two important factors: First, the execution environment, such as a Platform as a Service with unknown underlying technology, or a self-hosted Linux or Windows server. Second, programming language and frameworks. Even though standardisation is still an organisational concern, it will be interesting to know the impact of each strategy from a technical viewpoint.

### Communication

All services are committed to the popular REpresentational State Transfer (REST) paradigm^[TODO or is it an architectural style?] over HyperText Transfer Protocol (HTTP) for communication. They aim to meet the requirements for level 2 (3 being the highest) compliance with the Richardson Maturity Model^[The Richardson Maturity model is a pyramid of technical requirements for REST split into three levels, each denoting a higher level of compliance with the REST paradigm. TODO: briefly explain the levels? The well-known Martin Fowler has written an article available on http://martinfowler.com/articles/richardsonMaturityModel.html for more details.]. The specific style for communication (for example Remote Procedure Calls (SOAP over HTTP and RPC over TCP) being common alternatives) is not important for the actual deployment process, but instead a question of how the teams wish to expose their data.

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

```
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

The system is largely around two runtimes: the Java Virtual Machine (JVM), which is designed to run bytecode compiled from the Java programming language; and the popular JavaScript server runtime Node.js. Both the JVM and Node.js have cross-platform support, allowing all services to be deployed to a virtual Linux host. The specific services were implemented follows, with (1) three Clojure applications, (2) one Java application, (3) one Node.js application, and (4) one static JavaScript web browser application.

Keeping the system as close to realistic as possible is important for the findings' validity [TODO REFERENCE TO OATES maybe?]. Many popular applications can be generalised (although greatly simplified in the process) to:

- storage and authentication of __users__;
- a collection of __items__ (e.g., posts on a social medium);
- a set of __links__ between _items_ and _users_, e.g. "saving" an _item_ for later access; and
- a __recommendation__ engine suggesting new _items_ to a user based on their current state.



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

## Limitations of this implementation approach

BeerFave aims to cover as much ground as possible. Even so, it is still a small, isolated reference application never executed in a real world scenario. This brings a few limitations to how the results may be interpreted.

For practicality, this implementation ignores the Microsoft stack. For example, standardising deployment of all applications to a single virtual server (a common case for many companies) would be very difficult. This may change in the near future with Microsoft's work on opening the source code of .NET Core^[https://blogs.msdn.microsoft.com/dotnet/2014/11/12/net-core-is-open-source, https://github.com/Microsoft/dotnet], but it is still very much a work in progress at the time of writing. This means that the results from this study may not be applicable to projects utilising the Microsoft technology.

Execution environments, a key theme in this thesis, have limited representation. The self-hosted deployments are only tested on the popular Linux distribution Ubuntu 15.10 (Wily Werewolf, released October 2015). There are many other popular Linux server distributions, including Debian^[https://www.debian.org/] (which is the basis for Ubuntu), Red Hat^[https://www.redhat.com/en/technologies/linux-platforms], and the minimalistic operating system CoreOS^[https://coreos.com/] which is designed specifically to run App Containers such as Docker or rkt^[https://github.com/coreos/rkt]. Furthermore, server distributions of Mac OSX and Microsoft Windows are popular as well, but not considered here.

Despite the Framework aiming to help both small and large businesses, BeerFave will never see any large data sets nor real load. Thus, it cannot be guaranteed that any given deployment implementation provides acceptable execution performance. Indeed, the findings in this thesis are largely based on the assumption that access to memory and storage space go beyond any real concern in context of deployment. Additionally, data transfer speeds and issues such as pagination of long responses are ignored.

A final interesting aspect to consider is the idea of _universal web apps_, where the layout markup (e.g., HTML) is partly rendered on the server side before being sent to the client. At present, this idea is entirely focused on the web API and client, whereas the focus of this thesis is on the overall microservice context. In time, however, some form of this idea may see use in microservices beyond a web API.
