# Introduction

Service-based computing (and variants commonly referred to as "microservices" and "service-oriented architecture") and Continuous Deployment (CD) have both gained great traction in the development community with the rise of Cloud computing and the "as a Service" trend. Numerous conferences and magazines around the world, such as SciTePress's International Conference on Cloud Computing and Services Science (CLOSER)[^closer] and IEEE Cloud Computing[^ieee-cc] and all its conferences[^ieee-cloud-conferences], and the themes are to be found at most popular conferences on software engineering, development, and operations.

[^closer]: CLOSER: http://closer.scitevents.org
[^ieee-cc]: IEEE Cloud Computing: http://cloudcomputing.ieee.org
[^ieee-cloud-conferences]: IEEE Cloud Computing conferences: http://cloudcomputing.ieee.org/conferences

The microservice trend is also clearly apparent in the software industry, with huge web-based Software as a Service (SaaS) companies such as Netflix^[http://techblog.netflix.com/2015/02/a-microscope-on-microservices.html] and Amazon^[http://highscalability.com/amazon-architecture]. One relatively famous rant comparing Amazon's infrastructure strategy to Google's is available on Google+^[https://plus.google.com/+RipRowan/posts/eVeouesvaVX], and presents quite a few key points about why it makes sense for a large SaaS provider to build a _platform_ based on services, rather than a few, or even many, monolithic applications.

I have followed the developments in the world of microservices for some time, and in particular the online classified media company FINN.no, one of Norway's largest websites^[http://rapp.tns-gallup.no/?aid=9072261] and certainly among the most involved in building a microservice-based platform to serve their requests. I worked at FINN.no for four months as a student, and learned about some of the benefits and challenges of the microservice architecture.

During this work, it became apparent that one of the key unsolved challenges for a microservice-based platform is implementing and maintaining immediate releases---Continuous Delivery---and automating the process of deployment in the context of a relatively large platform with several hundred microservices. There are some tales from the software industry: Netflix and Amazon are frontrunners for this architecture, and have evaluated many strategies and practises organically.

The service-based architecture has received quite some attention from the academic community. In particular, Service-Oriented Architecture (SOA), which emerged and surged in popularity in recent years, has been closely scrutinised in the literature. However, there has been little focus on the practical aspects of maintaining a frequent deployment cycle for new changes.

A plethora of tools has been developed and is being actively used, ranging from complete operating systems such as LeverOS^[http://leveros.com/, introduced in a Medium blog post at https://blog.leveros.com/introducing-lever-os-d10a857f210e] to platforms for automatic horisontal scaling such as Kubernetes^[http://kubernetes.io/] and Deis^[http://deis.io/]. Some of these tools come from prominent actors in the software industry: for example, Kubernetes is developed and maintained by Google. Still, there is a clear tendency towards building general open-source solutions with contributions from the community.

With this rise of tools for packaging, testing, deploying, and scaling services, those in charge of selecting deployment strategies and committing to an underlying technology stack have few tools to guide them. In an attempt to bridge this gap, this thesis answers the following two research questions:

```include
src/components/research-questions.md
```

The remainder of the thesis is organised into five chapters.

First, the __Background__ chapter presents a literature review that explores and discusses the research areas relevant to Automated Continuous Deployment (ACD) in a microservice context.

Next, the __Method__ chapter presents the means used to answer the research questions. It argues for using Design Science Research [@hevner:dsr:2004] as a methodology for the project, and presents the design of the data generation methods and the software system built to evaluate the findings. It concludes by discussing some advantages and disadvantages of the selected research design.

The findings from the data generation methods are presented in the __Results__ chapter.

The results are evaluated and discussed in the __Discussion__ chapter, which concludes with the final iteration of the artefact.
TODO: "tone down" the use of the word "artefact".

Finally, the __Conclusion__ chapter summarises the work and the results, and suggests areas of future research.
