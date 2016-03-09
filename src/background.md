# Background

This section describes the existing foundations that this thesis draws upon in order to make a contribution. In broad strokes, there are two key areas of research to discuss:

- __(Continuous) delivery__ and automated deployment, focusing on the technical aspects of this process; and
- Software architecture, in particular the __microservice architectural pattern__ which is the key focus of this thesis.

The overarching goal of this thesis is to provide a framework for comparing approaches to tying these fields together in a real-world context. Continuous Delivery impose some organisational and cultural requirements as well as technical: separate teams _developing_ and _managing_ a service will necessarily lead to overhead, which hinders true _continuous_ delivery of new features. Thus, this chapter also touches the concept of DevOps (from "development" and "operations").

## Continuous Delivery &amp; DevOps

The field of software artefact deployment is something every single online service provider must handle in some way. Web applications fall into the _Software as a Service_ (SaaS) category, so artefact deployment is an extremely common task. It can be (and is) handled in a plethora of manners, ranging from simply logging onto a production server and changing some PHP code, to running a pre-built artefact through several layers of automated tests, several test environments for manual quality assurance work involving layers of bureaucracy, and finally deploying the new functions to only a subset of the production servers (green/blue deployment, see http://martinfowler.com/bliki/BlueGreenDeployment.html) and only a fraction of the end users (canary release, see http://martinfowler.com/bliki/CanaryRelease.html).

Continuous Delivery sits somewhere in between these extremes: the artefact can be run through a series of automated tests and deployed using blue/green deployment and/or canary releases---the key is that there is _no_ manual interaction to hinder the deployment process once new code has been shared.

## The Microservice architectural pattern

An application written using the microservice architectural pattern typically consists of several _multiple autonomous feature-oriented services_, instead of the traditional _monolithic_ approach where conceptually separate parts of the application typically share the same code base, runtime, and databases.

For instance, an e-commerce site such as [Amazon.com](https://amazon.com) may split their application into:

- One service managing registered users;
- One service keeping track of inventory; and
- One service dealing with orders.

TODO: Visualise this stack?

Additionally, but somewhat unrelated to the microservice pattern, the application may have one or more user interface applications. This typically includes a user-facing web application, one or more mobile application(s), and one or more back-office management application(s) for internal use.  However, microservices come into play if one determines to split for instance the _user-facing web application_ into multiple web applications. These can be navigated without making the user aware that s/he is switching between applications, given a uniform look and feel.

The microservice pattern places no restrictions on technology choices such as language and framework for each service: the only hard requirement is that each service must expose an interface through which it is possible to communicate with the service. For example, one may build a REpresentational State Transfer (REST) interface on top of the HyperText Transfer Protocol (HTTP), or a Remote Procedure Call (RPC) interface built directly on the Transmission Control Protocol (TCP). It is, then, possible to build hundreds of services, each in a different programming language, However, this can place a heavy burden on the infrastructure if the services are not properly contained and may not be _feasible_.

The popular Platform as a Service (PaaS) provider [Heroku](https://heroku.com) has defined a document it calls __The Twelve-Factor App__ (http://12factor.net), a set of twelve requirements that should be met by each service to enable simple deployment. These requirements concern every layer of the application, including (but not limited to) code base structure, dependency declaration, testing environments, and logging.

## Continuous Delivery and microservices

Continuous Delivery can be achieved with any application regardless of internal software architecture, as the model is only concerned with building, testing, and deploying an artefact. Each microservice should be autonomous and can thus be treated exactly like a larger (or even monolithic) application---but some interesting challenges arise when an organisation has tens, hundreds, or thousands of services working, and perhaps deploying, in parallel.
