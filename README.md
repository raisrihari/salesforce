# Unified Intelligent Service & Resolution Hub for Winchester Dynamics (Salesforce Project)

**Project by: Srihari Rai**
**Date Started: 5/10/25** 

## 1. Project Purpose & Problem Statement

**Purpose:**
This project aims to design and prototype a comprehensive, Salesforce-based "Unified Intelligent Service & Resolution Hub" tailored for a diversified technology company like **Winchester Dynamics**. The Hub will streamline and automate the end-to-end case lifecycle for complex technology products and solutions, from initial customer contact through to resolution, by intelligently routing, enriching, and managing cases and their associated service level agreements (SLAs).

**Problem Statement (Inspired by challenges at complex tech organizations like Honeywell Process Solutions):**
Large, diversified technology companies supporting a vast portfolio of products, software, and integrated solutions (across divisions like Building Technologies, Safety & Productivity Solutions (SPS), Aerospace, and Process Solutions) often face significant challenges in their global customer care (GCC) and global technical assistance (GTAC) operations. These challenges include:

*   **Case Misdirection & Inefficient Handoffs:** Difficulty in quickly routing customer issues to the correct specialized internal team, leading to delays and customer frustration.
*   **Knowledge Silos:** Disparate expertise across product lines, making it hard for agents to access the right information promptly.
*   **Complex SLA & Entitlement Management:** Accurately applying and tracking varied service contracts and SLAs for different customers and products.
*   **Repetitive Triage & Data Collection:** Manual effort spent on preliminary questions and diagnostics.
*   **Inefficient Escalation Paths:** Delays in escalating critical issues to specialized teams with all necessary context.
*   **Global Team Coordination:** Ensuring consistent service quality across geographically dispersed support teams.

This Hub aims to address these pain points by leveraging Salesforce Service Cloud and advanced automation capabilities.

## 2. Project Vision

The "Unified Intelligent Service & Resolution Hub" will provide Winchester Dynamics with:
*   A 360-degree view of customer support interactions.
*   Intelligent case triage and routing to appropriate GCC/GTAC tiers and specialized teams.
*   Automated application and tracking of SLAs via Entitlement Management.
*   Integration with a centralized Knowledge Base for faster resolutions.
*   Guided diagnostic and escalation processes for support agents.
*   Proactive monitoring of case aging and SLA compliance.
*   Enhanced reporting and analytics on support operations.

## 3. Technology Stack
*   Salesforce Platform (Developer Edition Org)
*   Salesforce Service Cloud features
*   Salesforce Flow (for automation)
*   VS Code with Salesforce Extension Pack (for development and metadata management)
*   Git & GitHub (for version control and portfolio showcase)

## 4. Project Stages & Progress

### **Stage 1: Admin Foundation - Advanced Case Management & Entitlement Setup (COMPLETED)**

**Goal:** To establish a robust foundational configuration within Salesforce Service Cloud for managing customer cases and service entitlements for Winchester Dynamics.

**Key Configurations & Developments in Stage 1:**

**I. Case Object Customization & Configuration:**
    *   **Standard Case Fields Leveraged:** Core fields like Subject, Description, Status, Priority, Origin, Account, Contact, Owner were reviewed and utilized.
    *   **Custom Fields Created on Case:**
        *   `WD_Product_Line__c` (Picklist, Required): Categorizes cases by Winchester Dynamics' main product divisions (Building Technologies, SPS, Aerospace, Process Solutions, Other).
            *   *Help Text:* "Select the main Winchester Dynamics product division this case relates to."
        *   `WD_Specific_Product__c` (Lookup to `WD_Product_Portfolio__c`): Links the case to a specific product record from the portfolio.
            *   *Help Text:* "Search for and select the specific Winchester Dynamics product or SKU related to this case."
        *   `WD_Selected_Product_Name__c` (Formula - Text): Displays the name of the product selected in the `WD_Specific_Product__c` lookup.
            *   *Help Text:* "This is the name of the product selected in the 'WD Specific Product' field."
        *   `WD_Reported_Component__c` (Text): Identifies the specific sub-component or module experiencing the issue.
            *   *Help Text:* "If applicable, specify the particular component or software module related to the issue."
        *   `WD_Error_Code__c` (Text): Stores any specific error codes from the customer or logs.
            *   *Help Text:* "Enter any error codes displayed to the customer or found in system logs."
        *   `WD_Customer_Environment_Details__c` (Long Text Area): Captures details about the customer's operating environment.
            *   *Help Text:* "Describe the customer's operating environment (e.g., OS version, network setup) relevant to this case."
        *   `WD_Initial_Support_Tier__c` (Picklist): Indicates initial support tier (GCC, GTAC).
            *   *Help Text:* "Select the initial support team or tier handling or assessing this case."
        *   `WD_Resolution_Details__c` (Long Text Area): Comprehensive description of the case resolution.
            *   *Help Text:* "Provide a detailed summary of how this case was resolved."
        *   `WD_Primary_Knowledge_Article__c` (URL): Link to the primary KB article used.
            *   *Help Text:* "Paste the URL of the most relevant Knowledge Article used for this case."
    *   **Case Record Types Defined:** `WD_Product_Inquiry`, `WD_Technical_Issue_BuildingTech`, `WD_Technical_Issue_SPS`, `WD_Technical_Issue_Aerospace`, `WD_Technical_Issue_ProcessSolutions`, `WD_Service_Request` to manage different case processes.
    *   **Case Status Picklist Values (Master List):** A comprehensive set of status values (New, Open, Working, Pending Triage, Awaiting Customer Information, In Progress (GTAC), Escalated, etc., including various Closed statuses) was defined.
    *   **Support Processes Configured & Assigned:**
        *   `WD Product Inquiry Process`
        *   `WD Technical Issue Standard Process` (used by all technical issue record types)
        *   `WD Service Request Process`
        *   Each process was assigned to its corresponding Case Record Type(s).
    *   **Page Layouts Designed & Assigned:** Custom page layouts (`WD Product Inquiry Layout`, `WD Technical Issue Layout - Common`, `WD Service Request Layout`) were created and assigned to provide optimized UIs for each record type.
    *   **Validation Rules Implemented:**
        *   `Require_Resolution_Details_on_Close`: Ensures resolution details are captured.
        *   `Require_Product_SKU_for_High_Priority_Tech_Issues`: Prompts for product SKU on high-priority technical cases (checks the `WD_Specific_Product__c` lookup).
        *   (Optional) `Prevent_Reopen_After_Final_Closure`.
    *   **Field History Tracking Enabled:** For key fields like Status, Priority, Owner, `WD_Product_Line__c`, `WD_Initial_Support_Tier__c`.

**II. Product Portfolio Data Model (`WD_Product_Portfolio__c` Custom Object):**
    *   **Purpose:** Centralized catalog of Winchester Dynamics product offerings.
    *   **Key Custom Fields:** `WD_Product_Name__c` (Text, Req), `WD_Product_SKU__c` (Text, Req, Unique, Ext ID), `WD_Product_Line__c` (Picklist, Req), `WD_Product_Version__c` (Text), `WD_Default_Support_Tier_Level__c` (Picklist), `WD_Product_Description__c` (Long Text Area), `WD_Is_Active__c` (Checkbox).
    *   **Page Layout:** `WD Product Portfolio Layout` configured.
    *   **Sample Data:** 5-10 sample product records created via CSV import.

**III. Entitlement Management Setup:**
    *   **Entitlement Management Enabled.**
    *   **Entitlement Templates Created:** `WD Standard Support`, `WD Premium Support`, `WD Critical Systems Support`.
    *   **Business Hours Defined:**
        *   `WD Standard Business Hours (Mon-Fri, 9am-5pm ET)`
        *   `WD Premium Support Hours (Mon-Fri, 8am-8pm ET)`
        *   `WD Critical 24/7 Support Hours`
    *   **Milestones Defined (Examples):** `First Response - Premium - High Prio` (1 hr), `Resolution Time - Premium - High Prio` (8 premium hrs), and similar variations for different support levels and priorities, each linked to appropriate Business Hours.
    *   **Entitlement Processes Created:** `WD Premium Support Process`, `WD Standard Support Process`, `WD Critical Systems Support Process`. Each process includes relevant milestones with specific time triggers (minutes to complete) and criteria (e.g., Case Priority). Basic warning/violation email alert actions planned/configured.
    *   **Sample Service Contracts & Entitlements:** Created for sample Accounts, linking them to the defined Entitlement Processes.
    *   **Automated Entitlement Application to Case:** A Record-Triggered Flow (`Assign_Entitlement_to_New_Case`) was developed to ensure reliable application of an active customer Entitlement to newly created Cases by populating `Case.EntitlementId`.
    *   **Entitlement Settings Reviewed:** Ensured Milestone Tracker is visible in Case Feed.

**IV. Queue Setup:**
    *   **Queues Created:** `WD GCC - General Inquiries`, `WD GTAC - Building Tech - Tier 1`, `WD GTAC - SPS - Tier 1`, `WD GTAC - Aerospace - Tier 1`, `WD GTAC - Process Solutions - Tier 1`, `WD Escalated Issues - Management Review`.
    *   Each queue configured to support the Case object and assigned test users.

**V. User Profiles & Permissions (Planning):**
    *   Reviewed standard System Administrator and Standard User profiles.
    *   Planned for future custom profiles/permission sets: `WD GCC Agent`, `WD GTAC Agent`, `WD Support Manager`.

---

### **Stage 2: Admin Enhancement - Knowledge Base Integration & Basic Case Routing Rules (COMPLETED)**

**Goal:** To enhance the support process by setting up a foundational Knowledge Base within Salesforce and implementing standard Case Assignment Rules to improve the initial routing of incoming cases to the appropriate Level 1 queues for Winchester Dynamics.

**Key Configurations & Developments in Stage 2:**

**I. Salesforce Knowledge Setup:**
    *   **Salesforce Knowledge Enabled:** Activated the Knowledge module.
    *   **Knowledge Settings Reviewed:** Default settings maintained initially.
    *   **Article Record Types Created:**
        *   `WD_FAQ` (API: `WD_FAQ`): For Frequently Asked Questions.
        *   `WD_Troubleshooting_Guide` (API: `WD_Troubleshooting_Guide`): For detailed troubleshooting procedures.
        *   `WD_Known_Issue_Workaround` (API: `WD_Known_Issue_Workaround`): For documenting known issues and workarounds.
    *   **Knowledge Page Layouts Customized (Basic):** Ensured essential fields (Title, Summary, Body, custom categorization fields) are accessible on layouts like `Knowledge-WD FAQ Layout`, `Knowledge-WD Troubleshooting Guide Layout`, etc. *(Self-verify and list actual layout API names if different)*.
    *   **Custom Fields Added to Knowledge Object:**
        *   `WD_Article_Product_Line__c` (Multi-Select Picklist): Categorizes articles by Winchester Dynamics product lines.
        *   `WD_Article_Product_SKUs__c` (Text Area): Lists comma-separated Product SKUs relevant to the article.
    *   **Sample Knowledge Articles Created:** [Number] sample articles of various types were manually created/imported and tagged with relevant product lines and SKUs using the custom fields. Articles were published.
    *   **(Optional) Data Category Setup:** A basic Data Category Group (`Product_Categories` - *Verify API Name*) was implemented, mirroring product lines for hierarchical article organization. Sample articles were assigned to these categories.

**II. Basic Case Assignment Rules:**
    *   **Active Case Assignment Rule Created:**
        *   **Rule Name:** `WD Standard Case Assignment` (Set as Active).
        *   **Description:** "Standard case assignment rule for Winchester Dynamics. Routes new cases to appropriate Level 1 queues based on Product Line."
    *   **Rule Entries Configured (Order of Evaluation):**
        1.  **Criteria:** `Case: WD_Product_Line__c` equals `Building Technologies`
            *   **Assign to Queue:** `WD_GTAC_Building_Tech_Tier_1`
        2.  **Criteria:** `Case: WD_Product_Line__c` equals `Safety & Productivity Solutions (SPS)`
            *   **Assign to Queue:** `WD_GTAC_SPS_Tier_1`
        3.  **Criteria:** `Case: WD_Product_Line__c` equals `Aerospace`
            *   **Assign to Queue:** `WD_GTAC_Aerospace_Tier_1`
        4.  **Criteria:** `Case: WD_Product_Line__c` equals `Process Solutions`
            *   **Assign to Queue:** `WD_GTAC_Process_Solutions_Tier_1`
        5.  **Criteria (Default/Catch-all):** `Case: WD_Product_Line__c` equals `Other` OR is blank.
            *   **Assign to Queue:** `WD_GCC_General_Inquiries`
    *   **Case Page Layouts Updated:** Ensured the "Assign using active assignment rule" checkbox is enabled by default on Case creation/edit pages.

---

### **Stage 3: Flow Automation - Record-Triggered - Intelligent Case Triage & Enrichment (COMPLETED)**

**Goal:** To develop Record-Triggered Flows on the Case object to automate triage, enrich cases with information, and alert personnel for Winchester Dynamics. This stage leverages the foundational Case, Product, and Entitlement setup from previous stages.

*   **Flow 1: `Case_Auto_Populate_Product_Details_Tier`**
    *   **Purpose:** Auto-populates `Case.WD_Product_Line__c` and `Case.WD_Initial_Support_Tier__c` based on the selected `WD_Specific_Product__c` (lookup to Product Portfolio). This ensures data consistency and accurate initial tiering.
    *   **Trigger:** Case created or `WD_Specific_Product__c` changed and is not blank.
    *   **Key Logic:**
        1.  Retrieves the related `WD_Product_Portfolio__c` record.
        2.  If found, updates the Case with `WD_Product_Line__c` from the Product.
        3.  Uses a formula to determine and set `WD_Initial_Support_Tier__c` on the Case based on the Product's `WD_Default_Support_Tier_Level__c`.

*   **Flow 2 (Combined A & B): Advanced Case Handling**
    *   **Part A: `Case_Critical_Case_Identification_Alert`**
        *   **Purpose:** Identifies critical cases (by "Critical" Priority or keywords like "SYSTEM DOWN," "OUTAGE" in Subject/Description), updates the Case to "Critical" priority, assigns it to the `WD_Escalated_Issues_Management_Review` Queue, and sends alerts (e.g., Chatter post to support managers).
        *   **Trigger:** Case created or Priority/Subject changed.
        *   **Key Logic:**
            1.  Decision element checks for "Critical" priority or specific keywords using formula resources.
            2.  If critical, retrieves the `WD_Escalated_Issues_Management_Review` Queue ID.
            3.  Updates the Case OwnerId and Priority.
            4.  Posts a notification to Chatter.
    *   **Part B: `Case_Specialized_GTAC_Routing_Task_Creation`**
        *   **Purpose:** Routes cases already marked for GTAC (by `WD_Initial_Support_Tier__c`) to more specialized GTAC sub-queues (e.g., `WD_GTAC_Aero_Navigation`) based on `WD_Reported_Component__c` and creates an initial diagnostic task for that queue.
        *   **Trigger:** Case `WD_Initial_Support_Tier__c` is GTAC, and relevant fields (Product, Component, Owner) change or case is new.
        *   **Key Logic:**
            1.  Decision element determines the specialized route based on `WD_Product_Line__c` and `WD_Reported_Component__c`.
            2.  An assignment element sets a variable (`var_TargetQueueDeveloperName`) with the DeveloperName of the target specialized queue.
            3.  A single Get Records element retrieves the target Queue using `var_TargetQueueDeveloperName`.
            4.  If Queue is found, Case `OwnerId` is updated.
            5.  A new Task is created, related to the Case, and assigned to the specialized queue with a dynamic subject and description.

*   **Flow 3: `Case_Suggest_Relevant_Knowledge_Articles`**
    *   **Purpose:** Suggests relevant published Knowledge Articles on the Case Feed based on the Case's Product Line and the selected Product's SKU to assist agents.
    *   **Trigger:** Case created or Subject/Product Line/Specific Product (`WD_Specific_Product__c`) changed.
    *   **Key Logic:**
        1.  Retrieves up to 3 published Knowledge Articles matching the Case's `WD_Product_Line__c` and the `WD_Product_SKU__c` from the related `WD_Product_Portfolio__c` record. Articles are sorted by `LastPublishedDate`.
        2.  If articles are found, loops through them.
        3.  Posts a formatted message to the Case Chatter feed with a link to each suggested article's Title and Summary.

*   **Flow Trigger Order Implementation for Record-Triggered Case Flows:**
    To ensure predictable execution, the following trigger order has been established:
    1.  `10`: `Assign_Entitlement_to_New_Case` (From Stage 1, applies SLA)
    2.  `20`: `Case_Auto_Populate_Product_Details_Tier` (Flow 1 of Stage 3)
    3.  `30`: `Case_Critical_Case_Identification_Alert` (Flow 2A of Stage 3)
    4.  `40`: `Case_Specialized_GTAC_Routing_Task_Creation` (Flow 2B of Stage 3)
    5.  `50`: `Case_Suggest_Relevant_Knowledge_Articles` (Flow 3 of Stage 3)

---

### **Stage 4: Flow Automation - Scheduled Flow - Proactive Case Monitoring & Maintenance (COMPLETED)**

**Goal:** To automate regular checks for potentially stale cases and prompt for review, ensuring no customer issue is neglected.

*   **Flow 4: `Scheduled_Weekly_Stale_Case_Review_Reminder`**
    *   **Purpose:** Identifies open Winchester Dynamics cases that have not been modified for more than 14 days and creates a reminder task for the case owner to review and take action.
    *   **Type:** Scheduled-Triggered Flow.
    *   **Schedule:** Configured to run weekly (e.g., every Monday at 8:00 AM).
    *   **Key Logic:**
        1.  Retrieves `Case` records where `IsClosed` is False and `LastModifiedDate` is older than 14 days ago (using a formula resource `{!$Flow.CurrentDateTime} - 14`). Optionally excludes "Critical" priority cases.
        2.  If stale cases are found, loops through the collection.
        3.  For each stale case, creates a new `Task` record assigned to the Case Owner, related to the Case, with a dynamic subject (e.g., "Stale Case Review: [Case Number] - [Case Subject]") and a due date (e.g., 2 days from creation). The task description includes details about the case's current status and product line.

---

### **Stage 5: Flow Automation - Screen Flow - Guided Agent Actions & Data Capture (COMPLETED)**

**Goal:** To provide Winchester Dynamics' GTAC agents with a guided, structured process for escalating product defects to the Engineering team, ensuring all critical information is captured consistently.

*   **Flow 5: `ScreenFlow_Escalate_Product_Defect_to_Engineering`**
    *   **Purpose:** Guides GTAC agents through collecting detailed information for escalating a suspected product defect.
    *   **Type:** Screen Flow.
    *   **Launched Via:** A Quick Action button ("Escalate Product Defect") on the Case record page. The flow receives the Case `recordId` as an input variable.
    *   **Process:**
        1.  **Get Current Case Details:** Retrieves key information from the launching Case record.
        2.  **Screen 1: Defect Confirmation & Product Details:** Displays Case/Product information. Collects `Defect Summary` (Text, Req), `Apparent Severity to Customer` (Picklist, Req - reusing Case Priority values), and `Reproducibility` (Picklist, Req - Always, Sometimes, Rarely, etc.).
        3.  **Screen 2: Steps to Reproduce & Environment:** Collects `Steps_to_Reproduce_Defect` (Long Text Area, Req) and `Additional_Relevant_Environment_Info` (Long Text Area). Displays existing `WD_Customer_Environment_Details__c` from the Case for reference.
        4.  **Screen 3: Observed vs. Expected Behavior:** Collects `Observed_Behavior` (Long Text Area, Req), `Expected_Behavior` (Long Text Area, Req), and `Workaround_Provided_to_Customer_If_Any` (Text Area).
        5.  **Get Engineering Queue ID:** Retrieves the ID of the `WD_Engineering_Defect_Review` Queue.
        6.  **Update Case:** If Queue is found, updates the originating Case (e.g., sets `Status` to "Escalated to Engineering," optionally updates a custom `WD_Escalation_Status__c` picklist, and populates a custom `WD_Engineering_Escalation_Notes__c` long text area with a summary of all inputs from the screens).
        7.  **Create Task for Engineering:** Creates a new `Task` record assigned to the `WD_Engineering_Defect_Review` Queue, related to the Case. The Task subject and description are dynamically populated with information from the Case and flow inputs, and priority is set based on the "Apparent Severity."
        8.  **Screen 4: Confirmation Screen:** Displays a success message to the agent, optionally including the created Task ID.
*   **Supporting Metadata Created for this Flow:**
    *   New Queue: `WD_Engineering_Defect_Review` (supports Case and Task objects).
    *   New Quick Action on Case object: `Escalate_Product_Defect` to launch the flow.
    *   (Potentially) New custom fields on Case for escalation tracking: `WD_Escalation_Status__c` (Picklist), `WD_Engineering_Escalation_Notes__c` (Long Text Area).

---

## How to Use This Repository
*   This repository contains the Salesforce DX project source code.
*   Metadata is organized under the `force-app` directory.
*   [Add any specific instructions if someone were to try and deploy this to their own org, e.g., prerequisites, deployment steps - for now, this is primarily a portfolio piece].

---
