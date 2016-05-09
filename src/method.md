# Method design

Having established a relevant research topic grounded in the current literature, this section presents some possible research designs and argues for triangulating two strategies: case study, and design & creation. The two overarching research questions for this thesis are as follows:

1. How can we best compare multiple strategies for Deployment Automation in a microservice context with many teams and services?
2. Using the comparison technique, how do some popular Deployment Strategies compare today?

- TODO: Use a framework for process and evaluation like Hevner, Peffers, or Vaishnavi?
- TODO: Motivation for conducting this research?
- TODO: Background info on me?

The main goal for this thesis is to help simplify the process of selecting a deployment strategy for use in a microservice context. This can be broken into three key __goals__ and four key __objectives__:

| Goal | Objective |
| ------------------------------------------ | ------------------------------------------ |
| Provide further insight into _how_ one implements automated microservice deployment | Review the existing literature on Automated Deployment, the Microservice architectural style, and how these fit together
| | Learn which factors are important to the industry
| Create a framework for easily analysing and comparing different strategies for automated deployment in the future | Develop an initial framework for analysing Deployment Strategies based on the literature review and the case study
| | Test and refine the framework in a realistic context
| Compare some popular Deployment Strategies | Conduct a comparison of some popular Deployment Strategies

1. Provide further insight into _how_ one implements automated microservice deployment;
2. Create a framework for easily analysing and comparing different strategies for automated deployment in the future; and
3. Compare some popular Deployment Strategies.

These key goals will be met when the following __objectives__ are completed:

1. Review the existing literature on Automated Deployment, the Microservice architectural style, and how these fit together;
2. Learn which factors are important to the industry;
3. Develop an initial framework for analysing Deployment Strategies based on the literature review and the case study;
4. Test and refine the framework in a realistic context, and provide a comparison of some popular Deployment Strategies.

Completing these objectives requires two separate steps:

- The first must seek to understand current industry practises, and establish relevance for the industry. This step must conclude with a framework for analysing Deployment Strategies.
- The second must battle-test and refine the framework by implementing and comparing deployment of a realistic set of services. This step will yield two results: a better framework, and an actual analysis of some popular deployment strategies.

Learning from the industry and establishing industry relevance can be done in a multitude of ways. @oates:2006 presents several research strategies for the information systems and computer science.

## Limitations of the triangulation

This research design completely ignores some important practical aspects of real-world software development: teamwork, coordination, and ever-changing priorities. Approaching the study with Action (Design) Research or Engaged Scholarship would have provided at least one set of insights into a real case. Conversely, however, there are many potential pitfalls with this strategy: stepping into to a real-world system comes at the expense of sacrificing control over both the infrastructure and the priorities for the system. In a worst case scenario, this could lead to simply not being able to analyse any strategies.
TODO: References for Action (Design) Research and Engaged Scholarship, and maybe pitfalls.
