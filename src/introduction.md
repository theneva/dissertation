# Introduction

Service-based computing (and variants commonly referred to as "microservices" and "service-oriented architecture") and Continuous Deployment (CD) have both gained great traction in the development community with the rise of Cloud computing and the "as a Service" trend. Numerous conferences and magazines around the world, such as SciTePress's International Conference on Cloud Computing and Services Science (CLOSER)[^closer] and IEEE Cloud Computing[^ieee-cc] and all its conferences[^ieee-cloud-conferences], and the themes are to be found at most popular conferences on software engineering, development, and operations.

[^closer]: CLOSER: http://closer.scitevents.org
[^ieee-cc]: IEEE Cloud Computing: http://cloudcomputing.ieee.org
[^ieee-cloud-conferences]: IEEE Cloud Computing conferences: http://cloudcomputing.ieee.org/conferences

The microservice trend is also clearly apparent in the software industry, with huge web-based Software as a Service (SaaS) companies such as Netflix^[http://techblog.netflix.com/2015/02/a-microscope-on-microservices.html] and Amazon^[http://highscalability.com/amazon-architecture]. One relatively famous rant comparing Amazon's infrastructure strategy to Google's is available on Google+^[https://plus.google.com/+RipRowan/posts/eVeouesvaVX], and presents quite a few key points about why it makes sense for a large SaaS provider to build a _platform_ based on services, rather than a few, or even many, monolithic applications.

This thesis presents a look into the process of continuously delivering changes---features and fixes---to the end users of a service-based system. The study learns from both the current academic literature and the industry to establish a set of important characteristics of a deployment strategy. The framework is evaluated and matured through iterative application to some common deployment strategies.

The framework itself is a utility for system architects in the process of selecting a strategy for continuous delivery of multiple services. It is designed to assist in both evaluation and comparison of strategies, and allows the user to focus on the characteristics that are important in their own context.

## Motivation

Part of the motivation for this project came from following the world of microservices over some time. In particular, the online classified media company FINN.no has been of interest. They develop and maintain one of Norway's largest websites^[http://rapp.tns-gallup.no/?aid=9072261], and are certainly among the Norwegian companies most involved in building a microservice-based platform to serve their requests. Following their work included working at FINN.no for four months as a student, and learning about some of the benefits and challenges of the microservice architecture.

During this work, it became apparent that one of the key unsolved challenges for a microservice-based platform is implementing and maintaining immediate releases---Continuous Delivery---and automating the process of deployment in the context of a relatively large platform with several hundred microservices. Even though FINN.no's teams were largely able to independently and continuously deliver new features to the end users, they were still unhappy with their current deployment strategy.

## Microservice deployment complexity

Continuous Delivery is a fairly simple task in a monolithic system: all required configuration is instructions to build and test the monolithic application, and how to deploy it. With few releases every day, it can even be feasible to maintain a continuous stream of releases without any automation. Automation of such as system may simply mean introducing a single build server that builds, tests, and deploys the system whenever new code is pushed to the revision control system.

A microservice-based system, however, introduces a whole new set of complications. In a relatively large system with hundreds of microservices, the system may see hundreds, or even thousands, of deployments in a single day. Introducing the microservice architecture in an existing project may require a distribution of deployment responsibilities: a single person, or even team, cannot handle the influx of new versions to deploy.

Adding to the complexity of microservices, the configuration code must be mirrored in each service. In an environment with a large number of microservices, this configuration code can pose a major overhead for the developers. Complex service-specific deployment configuration can also make future modifications to any part of the infrastructure difficult. Thus, a goal must be to separate the service-specific configuration from the infrastructure configuration. For example, global video streaming provider Netflix has solved this problem by building its own internal _Platform as a Service_ (PaaS)^[https://www.infoq.com/presentations/netflix-paas]. However, there is still no standard way to implement this.

Furthermore, a microservice-based architecture allows writing services in virtually any programming language. Adding to the complexity, any given team in a system of microservices can in practise govern their own strategy for deployment. The organisation may require the establishment of a deployment regime to reasonably limit technology choices, and create a uniform deployment strategy for each team and service.

Configuring each new microservice required adding two sets of configuration code. First, code relating to the service's internal settings in the service's own code base, indicating the locations of the source code and test code base, as well how to invoke tools for dependency management, building, and testing. Second, code relating to the service's runtime requirements in a centralised repository of this configuration code.

There are some tales from the software industry: the huge _Software as a Service_ companies Netflix and Amazon are frontrunners for this architecture, and have evaluated many strategies and practises organically. The service-based architecture has received quite some attention from the academic community. In particular, Service-Oriented Architecture (SOA), which emerged and surged in popularity in recent years, has been closely scrutinised in the literature. However, there has been little focus on the practical aspects of maintaining a frequent deployment cycle for new changes.

A plethora of tools has been developed and is being actively used and maintained, ranging from complete cloud-based operating systems such as LeverOS^[http://leveros.com/, introduced in a Medium blog post at https://blog.leveros.com/introducing-lever-os-d10a857f210e] to platforms for automatic horizontal scaling such as Kubernetes^[http://kubernetes.io/] and Deis^[http://deis.io/]. Some of these tools come from prominent actors in the software industry: for example, Kubernetes is developed and maintained by Google. Still, there is a clear tendency towards building general open-source solutions with contributions from the community.

## Aim of this thesis

With this rise of tools for packaging, testing, deploying, and scaling services, those in charge of selecting deployment strategies and committing to an underlying technology stack have few tools to guide them. In an attempt to bridge this gap, this thesis answers the following two research questions:

```include
src/components/research-questions.md
```

The remainder of the thesis is organised into five chapters.

First, the Background chapter presents a literature review that explores and discusses the research areas relevant to Continuous Microservice Delivery (CMD) in a microservice context.

Next, the Method chapter presents the means used to answer the research questions. It argues for using Design Science Research [@hevner:dsr:2004] as a methodology for the project, and presents the design of the data generation methods and the software system built to evaluate the findings. It concludes by discussing some advantages and disadvantages of the selected research design.

The findings from the data generation methods are presented in the Results chapter.

The results are evaluated and discussed in the Discussion chapter, which concludes with the final iteration of the framework.

Finally, the Conclusion chapter summarises the work and the results, and suggests areas of future research.
