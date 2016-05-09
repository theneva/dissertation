# Establishing a framework

## Discussion

This section considers each key area of concern for deployment automation discovered in the literature review of the Background chapter, and maps them to the findings from the interviews.

### Twelve-Factor App


### Cloud computing and the CAP theorem

### Support for the organisational deployment goal: deployment frequency flexibility

### Expressiveness and code as documentation

### DevOps???

### Architecturally Significant Requirements

Architecturally Significant Requirements (ASRs) is a common term for the requirements a deployment strategy impose on the architecture of the actual application to be deployed [e.g., @chen:architecting-for-cd:2015]. This is a……… TODO

- A clear intersection between literature (e.g., @chen:architecting-for-cd:2015) and the interview data
  - Best practises must be followed

The issue of deployment strategies affecting the overarching architecture of a single service, however, came up explicitly during the interviews.

## Security

Security can perhaps be considered an Architecturally Significant Requirement, but is a large enough field that to be included as a separate criterion. Security areas to consider include:

- Firewalling of services (when the service API is intended for internal use only)
- Securing connections with HTTPS (generating and updating certificates can be difficult given uptime requirements) (honorary mention to Let's Encrypt)

## Conclusion: The framework

This section has discussed several important aspects to consider when building and deploying applications in a microservice context. In conclusion of this section, (TODO table 1) presents the first part of the main artefact: a set of important criteria to consider when selecting a deployment strategy for a specific scenario, along with brief descriptions. The rest of the thesis describes the implementation of a reference case, and uses the framework to evaluate some popular deployment strategies. The entire thesis concludes with a final set of requirements uncovered from both this discussion and the implementation work.

| Criterion | Unit | Values |
| ---------------------------------------- | ----------- | ---------- |
| No ASRs beyond 12-factor app | Following the 12-factor guidelines should be enough (from the software architecture perspective) to deploy to any runtime
| Configuration as documentation of non-functional requirements | 
| Isolation | Low risk of collision between services (e.g., same database) | Full, avoidable, or no isolation.

asd

| &nbsp; | Manual, traditional deployment | Containers (Docker) | Virtual machine image | Script-based |
| ---------------------------------------- | ----------- | ---------- | --------- | -------- |
| No ASRs beyond 12-factor app                                                            | x | x | x |   |
| Configuration as documentation of non-functional requirements                           |   | x |   |   |
| No collision with other services on the same virtual host (e.g., shared database)       |   | x | x |   |
| Flexible resource dedication                                                            |(x)| x |   | x |
| Easy to duplicate on multiple hosts
| Load balance-able???
| Initial learning curve (consistent with findings of TODO REFERENCE HERE)
| Shared data between services(?)
| Multiple instances on the same host
| Ease of change deployment
| PaaS deployment
| Application start time (including boot)

## Limitations of this study

- What has not been looked at?
