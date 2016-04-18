# Manual deployment reflections

- Pulling from GitHub &amp; starting the server manually
    - Different versions of (e.g.) Java difficult (for example, some apps rely on JAVA_HOME), requires extra configuration to avoid this
    - Manual process, might break something
    - Slow af
    - One severe fault in one application takes down the machine
    - One fault in the physical machine takes down the entire ecosystem
    - No (simple) scaling
    - Easy, requires only knowledge of Linux and the environment to install
    - Fairly easy to replace a module if you know what you're doing
    - Impossible to restart without downtime (without load balancers); requires more physical machines
    - One process in one application can eat all resources on the machine (unless extra steps are taken to contain the resource uses, or all applications are run in a VM such as the Java VM)
    - Git must be installed on the machine
    - All versions of all required software/dependencies must be installed in the same namespace
    - Extra users should be configured (more manual work)
