# Discussion

The background chapter concluded with an important set of criteria identified in the current literature. Similarly, the results chapter presented a set of important criteria identified through the case study. These criteria were combined and used to evaluate the reference application _BeerFave_, which both demonstrated how the framework can be used, and brought up some important observations. This chapter maps the results from the literature review to those from the case study to establish an initial framework. Using this initial framework, each strategy implementation with BeerFave used to iteratively evaluate the framework.

Two key findings are presented in this chapter. First, the application of the framework to some deployment strategies provides an analysis of two deployment strategies using the framework. Second, the evaluation process results in a final revision of the framework.

## Scope

This thesis focuses almost entirely on the technical side of selecting and, to some extent, migrating to a new deployment strategy that fits the needs of an organisation or project. One notable omission is _system availability_: many organisations have uptime as a hard technical requirement. Strategies and architectures to ensure availability, such as failover to other geographical locations or even other cloud providers, will not be discussed in this chapter.

## The current literature

The literature review showed quite a few potential requirements for a comparison framework. This subchapter revisits the literature review presented in the Background chapter, and distils it to a set of criteria. These criteria are then condensed to a table.

### Configuration code LOC

The number of lines of configuration code is inversely proportional to the maintainability of the configuration [@talwar:comparison-of-approaches-to-service-deployment:2005, p. 74]. LOC is simple to count, given a reasonably small set of configuration files, which makes configuration LOC a relevant metric for evaluating and comparing deployment strategies.

In the context of automated deployment, there are two sets of configuration code: the configuration that specifies building and testing a service, and the code accepting and running the artefact. In a system with a large number of microservices, the centralised code should be negatable. Thus, this criterion is concerned only with the LOC required to configure a _new_ service.

LOC can simply be presented as a number, but a relative expression is perhaps more useful for comparison. LOC is also heavily influenced by the markup or language used to write the code. Still, it carries some meaning, and is expressed in the initial framework as _both_ the actual number of LOC and a grouping relative to the other strategies in the comparison, which is one of (None, Low, Moderate, High).

### Steps to deploy

The number of manual steps involved in a single deployment of a service is logically proportional to the time and cost spent on deploying the service [@talwar:comparison-of-approaches-to-service-deployment:2005, p. 74]. The steps can be quantified as the number of significant actions that must be performed between uploading the newest version of the code base to the revision control system, and the changes becoming available to the end users.

In a fully manual deployment context, these steps include building the artefact, running test suites, logging onto the server and installing the newly built artefact, and potentially restarting environments to accept new changes. In a fully automated context, a step can be to click a button to verify test results and begin the deployment process.

As the number of steps directly influences the overhead for deploying a service, the number of steps should optimally be limited to as small a number as possible. In a comparison of deployment strategies, the exact number of steps should be of interest.

### Modifiability

Modifiability is a well-established quality attribute in software engineering [@bass-clements-kazman:software-architecture-in-practice:2013], and applies to configuration code as well. @talwar:comparison-of-approaches-to-service-deployment:2005 [p. 74] defines the number of LOC required to express a configuration change---modify the configuration---as a quantifiable metric for modifiability.

As discussed previously, using LOC as a metric is imprecise because markup and programming language vary greatly in conciseness. However, it is still a useful metric in combination with others, and is expressed as both the actual number of LOC and a relative grouping, which is one of (None, Low, Moderate, High).

### Time to deploy

The actual time taken to deploy a service is proportional to the number of manual steps, which was discussed previously, but is also influenced by other factors. For example, building many services with a single centralised build server may lead to long queues, which prevents some of the benefits from implementing continuous deployment.

The time to deploy any given service varies with many external factors such as the current deployment queue. Thus, an average value over some time in a real context is required to say anything meaningful about the real impact. In the framework, this time should be an average, and is expressed as one of (Seconds, Few minutes, Several minutes, Hours).

### Learning curve

Deployment configuration may have two primary stakeholders: developers of a service, and maintainers of the infrastructure on which the service runs. In a context of hundreds of microservices and only one or a few infrastructures, the infrastructure configuration becomes negatable. Thus, the primary focus of the framework is on the configuration required for each _service_.

Rich Hickey, creator of the Clojure programming language, distinguished _simple_ from _easy_, defining "simple" as being of low complexity, and "easy" as being "at hand"^[https://www.infoq.com/presentations/Simple-Made-Easy]. This is a useful distinction in the context of deployment, as choosing an _easy_ solution to account for changes to the infrastructure may introduce multiple layers of complexity. Code complexity decreases maintainability [@bass-clements-kazman:software-architecture-in-practice:2013], which in turns leads to a more significant learning effort for new developers working on the service.

Greater complexity is logically inversely proportional to the developers' retention of the configuration. A tougher learning process for the configuration can even be preferable if the configuration is of low _complexity_---simple---leading to increased retention. In particular, retention trumps learning curve in cases where the deployment is standardised, so the configuration applies to all services in the system.

In the framework, both learning curve and retention should be considered, and comparisons may benefit from measuring learning curve and retention separately. Learning is defined as one of (Difficult, Moderate, Simple), and retention is defined as one of (Low, Moderate, High).

### DevOps efficacy

DevOps, the idea of giving responsibility for deployment of a service to its developers instead of dedicating a team to operations (Ops) work, is a popular method of managing deployment in a service-based environment without dedicating one person to deployment per service [@spinellis:by-hand:2012]. The framework must consider how simple it is to implement DevOps with the strategy in question.

A DevOps culture requires each team working on any given service to have at the very least one person familiar with deployment configuration. Ideally, each team member should be able to deploy the service; if only a single team member can deploy the service, that person's work would either be interrupted with each new completed feature, or new features would need to be deployed whenever that person had time, rendering _discontinuous_ delivery.

In the framework, DevOps concerns whether it is feasible for every team member to safely deploy the service at will without affecting other services or the host itself. This safety is typically guaranteed through automation [@spinellis:by-hand:2012], but can, of course, be ensured through other measures. It is expressed as either true or false.

### Self-documenting configuration

Configuration code can be viewed as executable knowledge [@armour:laws:2007]. The expressiveness of the configuration code is proportional to both maintainability and readability [@talwar:comparison-of-approaches-to-service-deployment:2005; @bass-clements-kazman:software-architecture-in-practice:2013]. If the service-specific configuration code can effectively explain the knowledge of the service's technical requirements, this "documentation" will never become outdated.

In the framework, this characteristic is either true or false.

### Only twelve factors

@chen:architecting-for-cd:2015 defined Architecturally Significant Requirements (ASRs) as technical requirements imposed on the service itself by its deployment configuration. The Twelve Factor App is a set of guidelines---factors---that simplify deployment. In the framework, services are assumed to follow relevant _factors_. The characteristic concerns whether the deployment strategy imposes additional requirements beyond those defined in The Twelve-Factor App.

The number of ASRs beyond the twelve factors is expressed as one of (Many, Few, None).

### Same-host duplicates

A common case for smaller organisations is to run their services on a single host. Even if the production environment is run from separate hosts, the workflow may include multiple pre-production environments. These can include one environment for rapidly deploying and testing new features, and another for a more stable, production-like verification before deployment to end users.

In this context, there is value in being able to run multiple instances of the same service, and possibly even different versions of the same service, on the same host. This characteristic is defined as one of (Simple, With custom configuration, Unfeasible).

### Condensing literature characteristics

This subchapter has discussed some characteristics identified in the current literature that can be useful when evaluating and comparing strategies for deployment in a microservice context. These characteristics can be condensed to the representation in table (TODO: reference to table).

```include
src/tables/criteria-from-literature.md
```

## The interviews

The interviews provided an insight into what the industry, represented by FINN.no, deems important in a deployment strategy. There is naturally some overlap with those characteristics discovered in the current literature. However, there are also some characteristics that were only somewhat discussed in the reviewed literature. This subchapter discusses the characteristics that were only uncovered through the interviews.

### Testability

The perhaps most unified requirement for a deployment strategy for FINN.no was testability. The strategy must allow testing on all of unit, module, and feature level. Feature level tests require briefly running a production-like environment with internal dependencies (e.g., the user service) installed and open for communication. The biggest difference between deployment strategies in this regard relates to service isolation.

In the framework, testability is defined as one of (Simple, Mocked dependencies).

### Complete automation feasibility

Team Reise has an explicit requirement that the deployment strategy must support complete automation. They are satisfied with their current, fully automated approach. In other words, a strategy must support various degrees of automation, as other services may require manual testing in a production-like environment before being deployed to the end users. In the framework, this characteristic is expressed as true or false.

### Monitorability

Team Cloud IO expressed a dependency on being able to monitor various metrics in the system, ranging from service-specific data such as Java Virtual Machine resource usage to tracing requests throughout the entire system. These metrics should be sent to a centralised location for visualisation of the data, and notifications if a metric exceeds a threshold.

Monitoring is important for both testing environments and the production environment, as new changes are deployed to the testing environment for review before advancement to production. This ties into the challenges of running multiple instances of the same service on the same host.

Another interesting challenge is reservation of computing resources to ensure monitorability even while the servers are overloaded. This is, however, a very specific metric, and is thus not considered in the framework.

In the initial framework, monitorability is considered as a complete package, although it may be valuable to separate various types of monitoring in a comparison of strategies. The value is expressed as one of (Simple, Feasible, Unfeasible).

### Resource scaling

Horizontal scaling is accomplished by starting or stopping instances of the same service to account for higher and lower load. Given money, the task of adding further hosts to the cluster has been rendered trivial by cloud providers.

In contrast, vertical scaling is accomplished by simply dedicating more computing resources to a specific service on a single host. Vertical scaling compensates for a high resource usage to complete a stateful operation. Cloud providers have made vertical scaling trivial to an extent as well, although only to an extent.

For FINN.no, it is important that a deployment strategy allows both horizontal and vertical scaling, as they have both stateless services that respond to a high number of requests, and stateful services that perform computationally expensive operations.

Both kinds of scaling is always going to be possible: it is possible to build a server farm to meet technical requirements. However, the aspect of cloud computing plays a significant role in this context. In the framework, scaling is defined by one of (Simple, Horizontal only, Vertical only, Manual).

### Automatic scaling

Automatic scaling takes resource scaling one step further, by automatically monitoring server load and starting or stopping instances to save computing power, and thus money. This is particularly relevant for test environments, as they are almost exclusively in use during daytime. In the framework, automatic scaling capabilities is expressed as true or false.

### Monetary costs

One key aspect of selecting a deployment strategy is monetary costs: the financial impact of configuring, transitioning to, and maintaining the infrastructure. This aspect was, interestingly, not discussed in the reviewed literature whatsoever.

Many technology stacks are open source and free to use, at the cost of building internal competence. On the other hand, some platforms such as OpenShift^[https://www.openshift.com] have commercial options where little internal competence is required at the cost of support fees. This cost was estimated to be too high for FINN.no, effectively dismissing it as an option.

Price ranges are difficult to estimate, but it is still highly valuable to have an indication of cost in a strategy comparison. In the framework, monetary costs are represented by one of (None, One-time payment, Recurring expenses).

### Multi-target deployment support

FINN.no is self-hosting their production environment, but hosting the testing environments at a cloud provider. Each service must be deployable to both the cloud environment and the self-hosted solution. Thus, the deployment strategy must result in and run artefacts that support a cloud environment. However, the environment is hosted in an _Infrastructure as a Service_, which can closely mirror the production environment.

Deploying the services to a _Platform as a Service_ is another relevant challenge to consider, but was not relevant here. In the framework, multi-target deployment support is expressed as either true or false.

### Dev/prod parity

The interviews showed that one real scenario is having a self-hosted production environment, but using a cloud provider for hosting development and testing environments. The tenth factor in The Twelve-Factor App methodology, __Dev/prod parity__, relates directly to this guideline. The testing environment must not differ functionally from the production environment, even though the underlying infrastructures may be completely different. Dev/prod parity is expressed in the framework as one of (Divergent, Similar, Equal).

### Condensing interview characteristics

The interviews revealed a few characteristics that are crucial to the industry, but not spared attention by the current literature. This indicates another gap in the literature on the topic of deployment from an industry perspective, which is outside the scope of this thesis.

The interviews also revealed a strong focus on developer productivity, which is difficult to measure. However, it is relevant to note that FINN.no focused less on quickly migrating to a new strategy, and more on building a solution that will be truly beneficial to their product value.

The capabilities deemed important have been condensed to a table in (TODO reference to table).

```include
src/tables/criteria-from-interviews.md
```

## Initial framework revision

So far, this chapter has established one set of requirements for a deployment strategy based on the existing literature, and one set of requirements based on interviews with the industry. This discussion revealed several factors that are of interest to the industry, but hardly covered in the literature. This subchapter combines these sets of criteria into a single framework meant to assist in evaluating deployment strategies. The initial revision of the framework is displayed in Table (TODO: reference to table).

```include
src/tables/initial-framework.md
```

The rest of this chapter uses the framework to evaluate three different deployment strategies. The results are then summarised and compared with the framework in an inclusive table mapping criteria to deployment strategies.

## BeerFave

This subchapter iteratively evaluates the initial revision of the framework by applying it to evaluate some strategies for Continuous Delivery.

### Manual deployment

In order to deploy a service, the developer must have been granted access to the production environment operating system. It requires the developer deploying a service to be familiar with the operating system, which may require internal training.

Manual deployment is characterised by zero configuration code, because the deployment process is not expressed in code, but instead completed in full by the developers themselves. This does not, however, remove the overhead of expressing the process: in a reasonably large company, the deployment process must be standardised, and thus documented. Any modifications to the production environment must be reflected in this documentation. In contrast, a fully manual approach to deployment inherently requires the highest number of distinct manual steps to perform a single deployment. Thus, the manual approach is more prone to human error than automation-based strategies.

A completely manual approach to deployment requires the developers to understand the deployment process and the Linux operating system, but does not introduce further layers of complexity. These concepts can also be considered fundamental to working a DevOps environment. Given a uniform infrastructure supporting all services, the retention is very high, and the deployment process is the same for each service.

Due to the high number of manual steps to deploy a single service, manual deployment is a time-consuming process for the developer on a single host, let alone a multitude of hosts in a cluster environment. Deploying a service written in a compiled language requires seven manual steps. Deploying the same version of the service to each subsequent host requires repeating the last four steps. In the realistic case of deploying this service to two different Environments, each running on a cluster of four hosts, the last four steps would be repeated eight times per successful deployment, resulting in a grand total of 35 manual steps per deployment.

In this approach, all applications run within the same execution environment. They have access to all resources in the host operating system limited only by the execution environment (e.g., the privileges of the Linux user that owns the process) and any access limitations imposed by the service itself, such as the Java Virtual Machine. Each Application Runtime competes equally for system resources unless further manually configured measures are taken. In other words, a long-running process in one service may cause a significant slowdown of other services.

In addition to competing for resources, each application in the execution environment is vulnerable to errors in the other services. A fatal error in any one service running in the same environment runs the risk of shutting other services down entirely.

The deployment strategy does not affect unit level tests, but starting the service to run module and feature-level tests requires a server-like environment on the development machine. Furthermore, automated feature-level testing can only be performed by manually running each Backing Service in the local environment, and the Backing Services should be reset between each test run. This introduces a large overhead into the development process, and makes feature-level testing possible with mocked Backing Services.

An application of the framework to evaluate manual continuous deployment of microservices is presented in (TODO: reference to table)

```include
src/tables/evaluation-manual-deployment.md
```

Applying the framework to manual deployment reveals some imperfections in the framework. In particular, computing clusters and Environments beyond the production environment are not considered. These factors are also significantly impacted by factors about the service itself, such as whether it is compiled. This can be alleviated by modifying _Steps to deploy_, and _Time to deploy_ to account for multiple hosts and environments, and add a characteristic concerning scaling to multiple hosts. These criteria are presented in Table (TODO reference to table):

| Criterion | Description | Unit | Manual deploy 
| -------------- | ------------------------------------ | ----------------- | ---------- |
| Steps to deploy | How many manual steps are required to singly deploy a compiled service to a host? | Step count (integer) | 7
| Time to deploy | How long does it take to singly deploy a change to a host? | (Seconds; Few minutes; Several minutes; Hours) | Few minutes
| Cluster scale | How are manual steps and time to deploy proportional to the number of target hosts? | (Linear growth; Constant increase) | Linear growth

Table: Second framework revision (cluster support)

### Scripted automated deployment

The continuous integration server moved the packaging and testing process away from the developers' local machines. For example, developers may work in Mac OSX, whereas the production environment runs on a Linux distribution. Running the build server in the same Linux distribution as the production environment adds some confidence that the service will behave as expected in the production environment.

The script for building, testing, archiving, and uploading a service, as well as the script for activating the new artefact can be generalised and duplicated among services and on production hosts. Thus, the number of hosts does not linearly affect to the number of steps or time to deploy the service as with manual deployment.

A new problem of keeping runtime versions synchronised between the build server and the production environment.

There are no required manual steps to complete a deployment beyond pushing the latest changes to the revision control system, given that the build completes successfully.

A home-grown script for activating a new version of a service inherently requires more lines of code than using an external tool. This enables the author of the script to customise the steps to the system's needs. Furthermore, all configuration-related code is openly available in the organisation. Thus, only a moderate amount of effort should be required to learn the deployment strategy. On the other hand, the configuration differs with programming language and runtime. This lowers the retention factor of the strategy.

```include
src/tables/evaluation-scripted-automated-deployment.md
```

Applying the framework to this scripted automated deployment strategy… TODO

## The final framework

This section has discussed several important aspects to consider when building and deploying applications in a microservice context. In conclusion of this section, (TODO table 1) presents the first part of the artefact: an iteratively developed set of important characteristics of a deployment strategy.

```include
src/tables/final-framework.md
```

## Limitations

The study presented in this thesis has provided one insight into how system architects can evaluate and compare strategies for Continuous Delivery. As with any other research design, however, there are some limitations to the narrow scope of this study. The key limitations of the selected research design are discussed in this subchapter.

### Interview limitations

Only a single company is represented in the interviews, and the number of informers is low. This makes it possible that the data is unreliable, but this risk will be mitigated for by the second step, where the interview data is tested in a realistic context. The data cannot, however, safely be generalised to fit any organisational size or structure. Indeed, FINN.no was chosen because they are ahead on technology choices in Norway, making them an exception rather than the standard.

The interviews also only provide a small sample of insights into the process and experiences. Therefore, the interview data may not be representative for the average team member, or even the average team. This is, however, not necessarily an issue: the team leaders' responsibility for their own teams requires them to be aware of the teams' efficiency.

The data could be made more generalisable by extending the case study to include surveying developers in other positions and teams, perhaps using a questionnaire based on the interview data [@oates:2006, p. 141]. The case study could also include other data generation methods, such as internal documents. This would, however, take much longer to complete, and is not critical to this initial attempt at defining a framework.

This research design avoids some important practical aspects of real-world software development: teamwork, coordination, and ever-changing priorities. Approaching the study with a variant of Action Research or Action Design Research [vaishnavi:2015], or Engaged Scholarship [ven:engaged-scholarship:2007] would have provided at least one set of thorough insights into a real case. Conversely, there are many potential pitfalls with this strategy: stepping into to a real-world system comes at the expense of sacrificing control over both the infrastructure and the priorities for the system. In a worst case scenario, this could lead to simply not being able to analyse any strategies.

### BeerFave implementation limitations

BeerFave aims to cover as much ground as possible in its attempt to answer the research questions. Even so, it is still a small, isolated reference application never executed in a real world scenario. This brings a few limitations to how the results may be interpreted.

Perhaps most importantly, BeerFave is implemented by a single developer outside any organisation. As a direct result, the lone developer is responsible for deployments. This firmly separates the DevOps process from the real world, as there are no other teams---or even team _members_---to account for. Further, there is only one live system besides the local development environment. This makes it hard to say anything about various Environments like _production_ and _test_. Finally, restraints such as the use of Long-Term Service (LTS) software versions are not considered. This means that recent updates to the software may cause results to differ. The issue of LTS versions may be especially prominent in the JavaScript and Node.js community, where new language features are being added frequently. As an example, the first LTS version of Node.js, v4.2.0, was announced in October 2015^[https://nodejs.org/en/blog/release/v4.2.0/]. Node.js v6.0.0 with heavily improved support for new JavaScript language features was announced in April 2016^[https://nodejs.org/en/blog/release/v6.0.0/].

The framework will only be tested on a single case, which is a small and isolated system in a controlled environment. This means that the framework will only be "proven" for this specific case; it will take multiple projects to say anything about the generalisability of the framework with respect to systems of different sizes.

The system is an oversimplification, only deployed to a single host. In this case, it is unfeasible to consider system downtime during deployment as a factor. For the sake of simplicity, the method omits uptime during deployment as a factor, despite constant uptime being a crucial point of interest for the industry.

For practicality, this implementation ignores the Microsoft stack. For example, standardising deployment of all applications to a single virtual server (a common case for many companies) would be very difficult. This may change in the near future with Microsoft's work on opening the source code of .NET Core^[https://blogs.msdn.microsoft.com/dotnet/2014/11/12/net-core-is-open-source, https://github.com/Microsoft/dotnet], but it is still very much a work in progress at the time of writing. This means that the results from this study may not be applicable to projects utilising the Microsoft technology stack.

Execution environments are a key theme in this thesis, but have very limited representation. The self-hosted deployments are only tested on the popular Linux distribution Ubuntu 15.10 (Wily Werewolf, released October 2015). There are many other popular Linux server distributions, including Debian^[https://www.debian.org/] (which is the basis for Ubuntu), Red Hat^[https://www.redhat.com/en/technologies/linux-platforms], and the minimalistic operating system CoreOS^[https://coreos.com/] which is designed specifically to run App Containers such as Docker or rkt^[https://github.com/coreos/rkt]. Furthermore, server distributions of Mac OSX and Microsoft Windows are popular as well, but not considered here.

Despite the Framework aiming to be applicable for both small and large businesses, BeerFave will never see any large data sets nor any real server load. Thus, it cannot be guaranteed that any given deployment implementation provides acceptable execution performance. Indeed, the findings in this thesis are largely based on the assumption that access to memory and storage space go beyond any real concern in context of deployment. Additionally, data transfer speeds and issues such as pagination of long responses are ignored.

### Triangulation limitations

On a more general level, triangulating a case study and a design and creation project brings its own set of limitations.

First of all, strategies for continuous delivery have been shown to impact the organisation as well as the technical infrastructure. This study has only considered the technical side in any considerable depth, leaving out aspects from the Information Systems branch such as IT governance.

A case study of an organisation utilising container technology would be highly relevant to provide a further indication of whether the framework is applicable in a real-world context. However, such organisations are few and far between, particularly in Norway. If such a case study were to be conducted, however, it would be relevant to look to the paradigms of Engaged Scholarship [@ven:engaged-scholarship:2007] or Action Design Research [@sein:adr:2011] to further ensure industry relevance.

## Summary

This chapter has discussed the findings from the literature and the interviews, condensed them into an initial framework, and iteratively evaluated the framework through an implementation project. Each iteration introduced a new deployment strategy, and each evaluation was finally used to compare each strategy in a manner useful for a system architect deciding upon a deployment strategy.

The next and final chapter, Conclusion, summarises and briefly evaluates the study and findings, and suggests areas of further research.
