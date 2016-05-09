| Criterion | Unit | Values |
| ---------------------------- | ---------------------------------- | --------------- |
| No ASRs beyond 12-factor app | Following the 12-factor guidelines should be enough (from the software architecture perspective) to deploy to any runtime | (None; Somewhat; Completely)
| Configuration as documentation | Configuration code itself doubles as documentation of the non-functional requirements that led to the configuration, eliminating the need to document these elsewhere. | None; Some; Completely
| Isolation | Low risk of collision between services (e.g., same database) | None; Possible; Full
| Flexible resource dedication | Dynamic dedication of system resources (e.g., CPU, memory) to services as needed | Pre-allocated; Somewhat dynamic; Dynamic
| Same-host duplicates | Possibility to run multiple instances of the same application on a single host | Impossible; Possible; Easy
| Load balanceable | Possibility to run multiple instances of the same application on multiple hosts to spread out load | Impossible; Possible; Easy
| Forgiving (rollback) | Allowing efficient rollback of new changes that do not function as expected | Slow; Fast
| Application startup time | Time taken between validation and availability of new changes | Milliseconds (average)
| Deployment target flexibility | Support for IaaS deployments and PaaS deployments | Impossible; Possible; Easy
| Initial learning curve | Level of deployment-specific knowledge required to reliably run deployments | Low; Some; High

Table: Criteria with descriptions
