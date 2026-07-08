---
name: Bug report
about: For problems and errors
title: ''
labels: bug
assignees: JackDunnCodes
body:
- type: input
  id: which
  attributes:
    label: Which file/project is this issue related to?
    description: "There's multiple projects in this repo. I need to know what one you're using"
    placeholder: "e.g. moreuniqid.php, onlinephp-autologin.user.js"
  validations:
    required: true
- type: textarea
  id: describe
  attributes:
    label: Describe the bug
    description: "A clear and concise description of what the bug is."
  validations:
    required: true
---

**To Reproduce**
<!-- Step by step guide to reproduce the behavior -->
1. 

**Expected behavior**
<!--A clear and concise description of what you expected to happen.-->

**Screenshots**
If applicable, add screenshots to help explain your problem.

<!--Next, enter device information below: -->
**Desktop (please complete the following information):**
 - OS: <!--e.g. iOS-->
 - Browser <!--e.g. chrome, safari-->
 - Version <!--e.g. 22-->

**Smartphone (please complete the following information):**
 - Device: <!--e.g. iPhone6-->
 - OS: <!--e.g. iOS8.1-->
 - Browser <!--e.g. stock browser, safari-->
 - Version <!--e.g. 22-->

**Additional context**
<!--Add any other context about the problem here.-->
