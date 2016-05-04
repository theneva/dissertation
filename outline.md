# Thesis outline

This document is a brief outline of the entire thesis with sections in order.

## Introduction

A brief justification of researching microservice deployments, with a fundamental introduction to the subject matter.

## Background

Review of key literature on deployment, including various deployment _strategies_ (e.g. manual vs. automated; release cycle vs. continuous delivery), quality metrics for code and processes, and other tradeoffs from committing to a deployment strategy.

## Method

A presentation of how data is gathered and the goal for the thesis in terms of artefacts. Discusses triangulating an interview-based _case study_ and a _design and creation_ project to verify the findings.

## Interview data

A presentation of data gathered in interviews with developers at FINN.no, one of Norway's front runners on microservice development with a large user base and high traffic. Describes their experiences with home-made deployment solutions as well as a transition to container-based deployment with Docker.

## The Twelve-Factor App

A brief summary of Heroku's guidelines named "The Twelve-Factor App"^[http://12factor.net] aiming to simplify development and deployment in a _Software as a Service_ context through placing requirements on the service implementation. Relates these factors to the theme of the thesis, and justified using them to guide the rest of the thesis.

## Establishing a framework

An in-depth discussion of correlation and discrepancies between the findings from the literature review and the interviews. Considers quantification of developer productivity, which is a key issue for the industry. Built on The Twelve-Factor App guidelines.

## The Framework

An elaborated conclusion of the discussion in the previous section, and the scoping of the thesis: presents each criterion by:

- suggesting a _unit_ for the criterion (a means of quantifying the criterion's presence or quality), and
- providing a justification for including it in the framework, as well as a consideration of "lost" concerns.

Concludes with a table of criteria, their descriptions, and a way of measuring them in a real scenario. May be merged with the previous section. Candidate for an individual research article.

## Implementation project (design and creation project) 

A presentation of the rationale behind the system (comprising multiple microservices and a web client) implemented to test and mature the Framework. Briefly presents each application/service's implementation and role in the overall system.

Presents experiences from deploying the entire system presented in the previous section, using some popular deployment strategies: manual deployment, script-based automated deployment (with Bash), automated orchestration (with Puppet), container-based manual deployment (with Docker), and finally automated container-based deployment (with Docker and Deis). Concludes with a measurement of each strategy using the Framework.

Candidate for individual research article based on the Framework article.

## Conclusion and future work

Reflections on the key findings, pros and cons of the method and scenarios, and suggestions for future work on software deployment in a microservice context.
