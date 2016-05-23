# Method 
The previous chapters have introduced and contextualised the research area, and discussed some of the relevant literature. This chapter presents the research design for this thesis, and argues for triangulating two research strategies: case study, and design and creation [@oates:2006]. The two overarching research questions for this thesis are as follows:

```include
src/components/research-questions.md
```

The main goal for this thesis is to help simplify the process of selecting a deployment strategy for use in a microservice context. This can be achieved by completing the following two steps.

First, an understanding must be established of current industry practises to ensure relevance for the industry. These practises must be discussed with regard to the current academic literature on the topic, so that well-tested methods of empirical analysis of a strategy can be utilised. This step must conclude with a framework for analysing any strategy for deployment.

Second, the framework established in the previous step must be battle-tested and refined by being used to actually compare deployment of a realistic microservice-based system. Designing and creating (i.e., implementing) a set of microservices, as well as an API gateway and a client, allows testing various strategies for deployment. The results of each evaluation can be organised using the framework, which in turn yields a data set useful for selecting a strategy suiting the needs of the organisation in question. An actual comparison of some popular strategies is a fortunate side effect of this approach to improving the framework.

Completing both steps requires combining two data generation methods: a case study to gather data, and an implementation project to verify and improve the data. Regardless of the number of methods combined, @oates:2006 [p. 37] calls this "method triangulation", and this term will be used in this sense throughout the thesis.

## Methodology

A research project such as this one can be conducted in a multitude of ways. There are several contributions on research processes for work in the fields of Information Systems and Applied Computer Science [e.g., @oates:2006; @hevner:dsr:2004]. This subchapter presents and discusses the established methodology Design-Science Research [@hevner:dsr:2004] as a fit for the conduct and evaluation of this research project.

### Conduct: Design-Science Research

@hevner:dsr:2004 proposed _Design-Science_ as a paradigm for research in the Information Systems domain. Design-Science research seeks to "extend the boundaries of human and organizational capabilities by creating new and innovative artifacts" [@hevner:dsr:2004, p. 75]. This contrasts _Behavioural-Science Research_, which seeks to understand human or organisational behaviour [@hevner:dsr:2004, p. 75].

Design-Science attempts to "create things that serve human purposes", and is technology-oriented [@march:research-on-it:1995, p. 253]. The methodology's basic activities are _building_ and _evaluation_ [@march:research-on-it:1995, p. 254], which are performed iteratively, before the final design artefact is generated [@hevner:dsr:2004, p. 78].

Answers to the research questions for this thesis has two main audiences: the aim is to provide practitioners with a tool for evaluating and comparing strategies to deployment, as well as to bridge the academic gap between microservices and continuous deployment. Establishing an initial framework based on the literature and interviews with practitioners, and incrementally improving the framework by applying it to realistic deployment strategies is a safe way to ensure industry relevance. Thus, Design Science is a good fit for this study.

@hevner:dsr:2004 defined _IT artefacts_ to include constructs, models, and methods used in development and use of Information Systems, but exclude matters of people and organisational elements. The artefact generated from the project presented in this thesis is the framework for evaluating and comparing strategies for Continuous Microservice Delivery (CMD).

The artefact is iteratively evaluated by implementing multiple strategies for CMD, and testing the framework by using it to evaluate each strategy. The artefact provides guidance on how to search the solution space for a problem, and is thus a _method_ [@hevner:dsr:2004, p. 79].

@hevner:dsr:2004 [p. 83] presented seven Design-Science Research Guidelines for conducting Design Science Research. Their table is reproduced in Table @tbl:design-science-research-guidelines-mapped, and additionally mapped to the expected outcomes of this study.

```include
src/tables/design-science-research-guidelines-mapped.md
```

### Evaluation

TODO: Add criteria for evaluating (use @hevner:dsr:2004)

## Learning from practitioners

Learning from the industry and establishing industry relevance is critical to ensure that the artefact will be useful to the practitioners. Relevance can be established in a multitude of ways: @oates:2006 presented multiple research strategies for the information systems and computer science. Relevant research strategies include performing a survey using a questionnaire or short interviews, or a case study.

Surveys are useful for obtaining a large set of standardised data, which allows patterns to emerge [@oates:2006, p. 93]. However, the initial step of this research project seeks to learn _how_ the industry practises deployment today, and _which_ properties are important in such a strategy. This requires an in-depth look into the processes, which can be accomplished using a case study.

```include
src/components/interview-presentation.md
```

## Design and Creation: BeerFave

Once an initial set of criteria for evaluating strategies for Continuous Microservice Delivery has been established, the framework should be tested in order to be valid. To accomplish this, a reference microservice-based system was developed. This system was incrementally configured to be deployed using two different strategies. After each strategy, the strategy was evaluated using the framework, and the framework was evaluated. This subchapter presents this system.

```include
src/components/beer-fave.md
```

## Summary

This chapter has presented the research design to investigate the research questions. First, an understanding of the industry's requirements for a Continuous Delivery strategy for microservices is established through a case study based around interviews at FINN.no. Second, two deployment strategies will be tested and evaluated using BeerFave, the reference system, as a controlled case. The next chapter shows the results from these methods of data generation.
