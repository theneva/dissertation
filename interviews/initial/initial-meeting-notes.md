# Initial FINN meeting notes January 21 2016

## People to talk to &amp; follow-up questions

- Stig Kleppe-Jørgensen: Team Lead for Team Reise
    - 16-man team split into four teams with four developers
        - Each team must be able to solve all problems, even with one person missing.
        - "Two-pizza teams": why, and how did it work?
    - Commits to master; code review retroactively (boy scout rule).
    - Completely automated deployment: no manual verify step, and no test environments.
    - Unit tests __and module tests__: automated tests act as test environment.
    - Rough architecture to handle scalability issues.
    - Only deploys Java WARs.
- Audun Fauchald Strand: Lead Developer for Infrastructure
    - Which problems do you solve with containers?
    - How much time was (roughly) spent evaluating alternatives?
    - How much will be developed in-house?
        - Linux distro
        - Pipeline (finnbuild.json)
        - Deis vs. FIaaS (in-house solution with Kubernetes) vs. OpenShift
    - What kind of monitoring must the stack allow?
- Morten: Pipeline &lt;3 FIaaS

## Important factors (for framework)

- Money/budget/contracts/support.
- Number of developers: FINN has 120, YMMV.
- Number of deployments per _x_ time.
- Data within country borders.
- Platform switch with no downtime (migrate to new infrastructure)
- Politics: try to avoid the "not invented here" principle

## Implementation

- 12-factor deployment: make it easy to do the right thing
    - Environment variables instead of `.ini` file.
    - Logging to stdout instead of knowing where (and if) the log file is.
- See Twitter's strategy: fat JAR with everything directly on Linux.
- See Netflix talk on how to make people use the infrastructure.

## Check later

- Cisco Mantl
- DigitalOcean and Google Compute Engine for my own implementation work
- Unikernel
- Unleash (was on Docker for a bit, then faced problems)
- Consul (service discovery)
