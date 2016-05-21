# Discussion

The background chapter concluded with an important set of criteria identified in the current literature. Similarly, the results chapter presented a set of important criteria identified through the case study. These criteria were combined and used to evaluate the reference application _BeerFave_, which both demonstrated how the framework can be used, and brought up some important observations.

This chapter maps the results from the literature review to those from the case study to establish an initial framework. Using this initial framework, each strategy implementation with BeerFave used to iteratively evaluate the framework. This chapter concludes with a final revision of the framework.

## Scope

This thesis focuses almost entirely on the technical side of selecting and, to some extent, migrating to a new deployment strategy that fits the needs of an organisation or project. One notable omission is _system availability_: many organisations have uptime as a hard technical requirement. Strategies and architectures to ensure availability, such as failover to other geographical locations or even other cloud providers, will not be discussed in this chapter.

## The current literature

The literature review showed quite a few potential requirements for a comparison framework. This subchapter revisits the literature review presented in the Background chapter, and distils it to a set of criteria. These criteria are then condensed to a table.

### Configuration code LOC

The number of lines of configuration code is inversely proportional to the maintainability of the configuration [@talwar:approaches-for-service-deployment:2005, p. 74]. LOC is simple to count, given a reasonably small set of configuration files, which makes configuration LOC a relevant metric for evaluating and comparing deployment strategies.

In the context of automated deployment, there are two sets of configuration code: the configuration that specifies building and testing a service, and the code accepting and running the artefact. In a system with a large number of microservices, the centralised code should be negatable. Thus, this criterion is concerned only with the LOC required to configure a _new_ service.

LOC can simply be presented as a number, but a relative expression is perhaps more useful for comparison. LOC is also heavily influenced by the markup or language used to write the code. Still, it carries some meaning, and is expressed in the initial framework as _both_ the actual number of LOC and a grouping relative to the other strategies in the comparison, which is one of (None, Low, Moderate, High).

### Steps to deploy

The number of manual steps involved in a single deployment of a service is logically proportional to the time and cost spent on deploying the service [@talwar:approaches-for-service-deployment:2005, p. 74]. The steps can be quantified as the number of significant actions that must be performed between uploading the newest version of the code base to the revision control system, and the changes becoming available to the end users.

In a fully manual deployment context, these steps include building the artefact, running test suites, logging onto the server and installing the newly built artefact, and potentially restarting environments to accept new changes. In a fully automated context, a step can be to click a button to verify test results and begin the deployment process.

As the number of steps directly influences the overhead for deploying a service, the number of steps should optimally be limited to as small a number as possible. In a comparison of deployment strategies, the exact number of steps should be of interest.

### Modifiability

Modifiability is a well-established quality attribute in software engineering [bass-clements-kazman:software-architecture-in-practice:2013], and applies to configuration code as well. @talwar:approaches-for-service-deployment:2005 [p. 74] defines the number of LOC required to express a configuration change---modify the configuration---as a quantifiable metric for modifiability.

As discussed previously, using LOC as a metric is imprecise because markup and programming language vary greatly in conciseness. However, it is still a useful metric in combination with others, and is expressed as both the actual number of LOC and a relative grouping, which is one of (None, Low, Moderate, High).

### Time to deploy

The actual time taken to deploy a service naturally ties in with the number of manual steps, which was discussed previously, but is also influenced by other factors. For example, building many services with a single centralised build server may lead to long queues, which prevents some of the benefits from implementing continuous deployment.

The time to deploy any given service varies with many external factors such as the current deployment queue. Thus, an average value over some time in a real context is required to say anything meaningful about the real impact. In the framework, this time should be an average, and is expressed as one of (Seconds, Few minutes, Several minutes, Hours).

### Learning curve

Deployment configuration may have two primary stakeholders: developers of a service, and maintainers of the infrastructure on which the service runs. In a context of hundreds of microservices and only one or a few infrastructures, the infrastructure configuration becomes negatable. Thus, the primary focus of the framework is on the configuration required for each _service_.

Rich Hickey, creator of the Clojure programming language, distinguished _simple_ from _easy_, defining "simple" as being of low complexity, and "easy" as being "at hand"^[https://www.infoq.com/presentations/Simple-Made-Easy]. This is a useful distinction in the context of deployment, as choosing an _easy_ solution to account for changes to the infrastructure may introduce multiple layers of complexity. Code complexity decreases maintainability [@bass-clements-kazman:software-architecture-in-practice:2013], which in turns leads to a steeper learning curve for new developers working on the service.

Greater complexity is logically inversely proportional to the developers' retention of the configuration. A steeper initial learning curve for the configuration can even be preferable if the configuration is of low _complexity_---simple---leading to increased retention. In particular, retention trumps learning curve in cases where the deployment is standardised, so the configuration applies to all services in the system.

In the framework, both learning curve and retention should be considered, and comparisons may benefit from measuring learning curve and retention separately. Learning is defined as one of (Difficult; Moderate; Simple), and retention is defined as one of (Low; Moderate; High).

### DevOps feasibility

Does the strategy allow DevOps (typically through automation)?

### Configuration as documentation



### Only 12 factors

No Architecturally Significant Requirements (ASRs) imposed on the deployed system beyond the 12 factor app.

### Same-host duplicates

Can the service be run in multiple instances on the same host?

### Distillation of criteria

These criteria have been condensed to table (TODO: reference to table).

```include
src/tables/criteria-from-literature.md
```

## The interviews

TODO: Contrast and compare criteria from the literature review and the interview data similarly to the previous subchapter.

```include
src/tables/criteria-from-interviews.md
```

## BeerFave

TODO: Use results from the BeerFave deployment implementations to identify and discuss weaknesses in the framework.

TODO: Mention that pulling Docker images and starting containers was a preferable alternative to actually installing some dependencies (e.g., database management systems).

## The final framework

This section has discussed several important aspects to consider when building and deploying applications in a microservice context. In conclusion of this section, (TODO table 1) presents the first part of the main artefact: a set of important criteria to consider when selecting a deployment strategy for a specific scenario, along with brief descriptions. The rest of this chapter evaluaties the framework using the reference application, and uses the framework to evaluate some popular deployment strategies. The entire thesis concludes with a final set of requirements uncovered from both this discussion and the implementation work.

TODO: Make the framework…

| Criterion | Description | Unit
| --------- | ----------- | ----
| TODO | Make | This

## Method evaluation

TODO: Use @hevner:dsr:2004 as described in __Method#Methodology__ to evaluate the process and result. Each…

## Limitations

This subchapter discusses some limitations of the research design.

### Interview limitations

Only a single company is represented in the interviews, and the number of informers is low. This makes it possible that the data is unreliable, but this risk will be mitigated for by the second step, where the interview data is tested in a realistic context. The data cannot, however, safely be generalised to fit any organisational size or structure. Indeed, FINN.no was chosen because they are ahead on technology choices in Norway, making them an exception rather than the standard.

The interviews also only provide a small sample of insights into the process and experiences. Therefore, the interview data may not be representative for the average team member, or even the average team. This is, however, not necessarily an issue: the team leaders' responsibility for their own teams requires them to be aware of the teams' efficiency.

The data could be made more generalisable by extending the case study to include surveying developers in other positions and teams, perhaps using a questionnaire based on the interview data [@oates:2006, p. 141]. The case study could also include other data generation methods, such as internal documents. This would, however, take much longer to complete, and is not critical to this initial attempt at defining a framework.

This research design avoids some important practical aspects of real-world software development: teamwork, coordination, and ever-changing priorities. Approaching the study with a variant of Action Research or Action Design Research [vaishnavi:2015], or Engaged Scholarship [ven:engaged-scholarship:2007] would have provided at least one set of thorough insights into a real case. Conversely, there are many potential pitfalls with this strategy: stepping into to a real-world system comes at the expense of sacrificing control over both the infrastructure and the priorities for the system. In a worst case scenario, this could lead to simply not being able to analyse any strategies.

### BeerFave implementation limitations

BeerFave aims to cover as much ground as possible in its attempt to answer the research questions. Even so, it is still a small, isolated reference application never executed in a real world scenario. This brings a few limitations to how the results may be interpreted.

Perhaps most importantly, BeerFave is implemented by a single developer outside any organisation. As a direct result, the lone developer is responsible for deployments. This firmly separates the DevOps process from the real world, as there are no other teams---or even team _members_---to account for. Further, there is only one live system besides the local development environment. This makes it hard to say anything about various Environments like _production_ and _test_. Finally, restraints such as the use of Long-Term Service (LTS) software versions such as Node.js v4.2.x Argon are not considered. This means that recent updates to the software may cause results to differ. The issue of LTS versions may be especially prominent in the JavaScript and Node.js community, where new language features are being added frequently. As an example, Node.js v4.2.x (LTS) was announced in October 2015^[https://nodejs.org/en/blog/release/v4.2.0/], and v6.0.0 with heavily improved support for new JavaScript language features was announced in April 2016^[https://nodejs.org/en/blog/release/v6.0.0/].

The framework will only be tested on a single case, which is a small and isolated system in a controlled environment. This means that the framework will only be "proven" for this specific case; it will take multiple projects to say anything about the generalisability of the framework with respect to systems of different sizes.

The system is an oversimplification, only deployed to a single host. In this case, it is unfeasible to consider system downtime during deployment as a factor. For the sake of simplicity, the method omits uptime during deployment as a factor, despite constant uptime being a crucial point of interest for the industry.

For practicality, this implementation ignores the Microsoft stack. For example, standardising deployment of all applications to a single virtual server (a common case for many companies) would be very difficult. This may change in the near future with Microsoft's work on opening the source code of .NET Core^[https://blogs.msdn.microsoft.com/dotnet/2014/11/12/net-core-is-open-source, https://github.com/Microsoft/dotnet], but it is still very much a work in progress at the time of writing. This means that the results from this study may not be applicable to projects utilising the Microsoft technology stack.

Execution environments are a key theme in this thesis, but have very limited representation. The self-hosted deployments are only tested on the popular Linux distribution Ubuntu 15.10 (Wily Werewolf, released October 2015). There are many other popular Linux server distributions, including Debian^[https://www.debian.org/] (which is the basis for Ubuntu), Red Hat^[https://www.redhat.com/en/technologies/linux-platforms], and the minimalistic operating system CoreOS^[https://coreos.com/] which is designed specifically to run App Containers such as Docker or rkt^[https://github.com/coreos/rkt]. Furthermore, server distributions of Mac OSX and Microsoft Windows are popular as well, but not considered here.

Despite the Framework aiming to be applicable for both small and large businesses, BeerFave will never see any large data sets nor any real server load. Thus, it cannot be guaranteed that any given deployment implementation provides acceptable execution performance. Indeed, the findings in this thesis are largely based on the assumption that access to memory and storage space go beyond any real concern in context of deployment. Additionally, data transfer speeds and issues such as pagination of long responses are ignored.

### Triangulation limitations

- Only looks at the technical aspect of deployment strategies, not software _management_.
- Deployment strategy imposes requirements on the organisation as a whole, as described in the background chapter.
- Could have used Engaged Scholarship or Action Design Research to get a much more intimate look into how an organisation implements a deployment strategy, especially with DevOps.
- A case study at an organisation that has already implemented container-based deployment would be relevant. However, there are few of these at a relatively large scale available for evaluation, especially in Norway.
