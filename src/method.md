# Method

Having established a relevant research topic grounded in the current literature, this section presents some possible research designs and argues for triangulating two strategies: case study, and design & creation. The two overarching research questions for this thesis are as follows:

```include
src/components/research-questions.md
```

- TODO: Use a framework for process and evaluation like Hevner, Peffers, or Vaishnavi?

The main goal for this thesis is to help simplify the process of selecting a deployment strategy for use in a microservice context. This can be achieved by completing the following two steps.

First, an understanding must be established of current industry practises to ensure relevance for the industry. These practises must be discussed with regard to the current academic literature on the topic, so that well-tested methods of empirically analysing a strategy can be utilised. This step must conclude with a framework for analysing any strategy for Automated Continuous Delivery.

Second, the framework established in the previous step must be battle-tested and refined by being used to actually compare deployment of a realistic microservice-based system. Designing and creating (i.e., implementing) a set of microservices, as well as an API gateway and a client, will allow testing various strategies for Automated Continuous Delivery. The results of each evaluation can be organised using the framework, which in turn yields a data set useful for selecting a strategy suiting the needs of the organisation in question. An actual comparison of some popular strategies is a fortunate by-effect of this approach to improving the framework.

Completing both steps requires combining two data generation methods. Regardless of the number of methods combined, @oates:2006 [p. 37] calls this "method triangulation", and this term will be used throughout this chapter.

## Methodology: Design-Science Research

@hevner:dsr:2004 proposed _Design-Science_ as a paradigm for research in the Information Systems domain. Design-Science research seeks to "extend the boundaries of human and organizational capabilities by creating new and innovative artifacts" [@hevner:dsr:2004, p. 75]. This contrasts _Behavioural-Science Research_, which seeks to understand human or organisational behaviour [@hevner:dsr:2004, p. 75].

Design-Science attempts to "create things that serve human purposes", and is technology-oriented [@march:research-on-it:1995, p. 253]. The methodology's basic activities are _building_ and _evaluation_ [@march:research-on-it:1995, p. 254], which are performed iteratively, typically a number of times, before the final design artefact is generated [@hevner:dsr:2004, p. 78]. This is a good fit for this project.

TODO: Peffers on Design-Science Research (DSR) to use that term

@hevner:dsr:2004 defined _IT artefacts_ to include constructs, models, and methods used in development and use of Information Systems, but exclude matters of people and organisational elements. The artefact generated from the project presented in this thesis is the framework for evaluating and comparing strategies for Automated Continuous Delivery (ACD).

The artefact is iteratively evaluated by implementing multiple strategies for ACD, and testing the framework by using it to evaluate each strategy. The artefact provides guidance on how to search the solution space for a problem, and is thus a _method_ [hevner:dsr:2004, p. 79].

@hevner:dsr:2004 [p. 83] presented seven Design-Science Research Guidelines, which are reproduced and mapped to the project presented in this thesis in (TODO table ???).

```include
src/tables/design-science-research-guidelines-mapped.md
```

## Learning from the industry: Interviews

Learning from the industry and establishing industry relevance can be done in a multitude of ways. @oates:2006 presented multiple research strategies for the information systems and computer science.

TODO: This section is mostly already written in the research methods report, as well as the research proposal.

### Limitations of the interview approach

TODO: References for Action (Design) Research and Engaged Scholarship, and maybe pitfalls.

## Refining the framework: Design and Creation

Once an initial set of criteria for evaluating strategies for Automated Continuous Delivery has been established, the framework must be tested in order to be valid.

```include
src/components/beer-fave.md
```

## Limitations of the triangulation

This research design completely ignores some important practical aspects of real-world software development: teamwork, coordination, and ever-changing priorities. Approaching the study with Action (Design) Research or Engaged Scholarship would have provided at least one set of insights into a real case. Conversely, there are many potential pitfalls with this strategy: stepping into to a real-world system comes at the expense of sacrificing control over both the infrastructure and the priorities for the system. In a worst case scenario, this could lead to simply not being able to analyse any strategies.

The system is an oversimplification, only deployed to a single host. In this case, it is unfeasible to consider system downtime during deployment as a factor. For the sake of simplicity, the method omits uptime during deployment as a factor, despite constant uptime being a crucial point of interest for the industry.
