# Features and General Goal 

**Here is the clean and updated goal:**

---

### **Project Title:** AarogyaScribe

### **General Goal**

To create a biometric and Aadhaar-based medical documentation system that allows patients to be verified independently on multiple devices using an ESP32 fingerprint sensor. 

Once verified, users can:
- Enter medical records (such as eye test data, lab reports, prescriptions, or clinical notes) from different laptops.
- Upload supporting documents and PDFs.

All data is stored in a **single centralized Firebase database**, acting as the common server. 

A main dashboard (single HTML file) allows doctors or patients to view **all historical records, recent visits, documents, and files** after independent biometric + Aadhaar verification. 

The system will later integrate an AI Agent (built using SimStudio) to intelligently process uploaded documents, generate structured notes, summaries, and digital prescriptions.

The ultimate aim is to solve the problem of scattered medical records by creating one unified, secure, and easily accessible patient record system linked to Aadhaar and biometrics.


### **Core AI Agent Features**
- AI Medical Documentation Agent built using SimStudio as the central brain of the system
- Automatically extracts structured data from uploaded documents (prescriptions, lab reports, discharge summaries, handwritten notes)
- Intelligently converts unstructured medical data into standardized formats
- Generates structured clinical documents including OPD notes, SOAP notes, and digital prescriptions
- Creates automatic medical summaries of a patient’s complete history
- Supports voice input for doctors to speak during consultation and get structured notes
- Performs drug interaction checking and allergy flagging
- Answers clinical questions about the patient’s medical history
- Suggests ICD-10 codes for diagnoses
- Reduces manual documentation time and minimizes human errors

### **Authentication & Security Features**
- Biometric fingerprint verification using ESP32 sensor
- Aadhaar-based patient identification
- Independent verification system on every page and every laptop
- Secure access control — only verified users can view or add patient records
- All records are strictly linked to patient’s Aadhaar number
- Complete audit trail of who accessed or modified records

### **Document Ingestion & Centralized Storage Features**
- Support for uploading documents from multiple laptops and departments (Eye Test, Lab, OPD, Radiology, etc.)
- Accepts multiple file formats including PDF, JPG, PNG, and scanned documents
- Stores all documents in a single centralized Firebase storage system
- Automatically saves both original files and AI-processed structured data
- Creates one unified source of truth for every patient’s medical history
- Supports ingestion of old paper records as well as new digital reports

### **Dashboard & User Experience Features**
- Main Dashboard (single HTML file) that shows complete patient view after verification
- Displays all documents, recent visits, lab reports, prescriptions, and AI summaries in one place
- Clean timeline view of patient’s medical history
- Direct view and download links for all uploaded PDFs and documents
- Easy navigation between original documents and AI-generated structured versions

### **Interoperability & Standardization Features**
- AI Agent standardizes all medical records into consistent, structured format
- Enables easy sharing of patient data between different hospitals and doctors
- Solves the problem of fragmented and non-standard medical records
- Exports data in standardized formats for interoperability

### **Additional Technical Features**
- Real-time data synchronization between multiple laptops using Firebase
- Independent verification workflow on both input pages and dashboard
- Automatic triggering of AI Agent after document upload
- Support for both structured data entry (eye test values, vitals, etc.) and unstructured document uploads
- Scalable architecture that can support multiple departments and devices

### **Impact Features (Solving Original Problem Statement)**
- Eliminates scattered and unorganized patient records
- Reduces delays in diagnosis and treatment
- Improves standardization across healthcare providers
- Enhances security and privacy of medical data
- Lowers documentation workload and operational costs
- Improves overall quality of patient care through quick access to accurate information

---


---




---
---
---
---
---




# WORKFLOW



### **AarogyaScribe - AI Medical Documentation Agent Workflow**

**1. Patient Verification Stage (Independent Verification)**
- The process begins when a patient arrives at any station (Input station or Main Dashboard).
- The doctor or staff uses the ESP32 fingerprint sensor along with Aadhaar number for verification.
- ESP32 sends the verification data to Firebase (`verifications` collection).
- Both the Input pages and the Main Dashboard listen independently to this collection.
- Once the status changes to “verified”, the respective page unlocks for that specific Aadhaar number. No shared session exists between devices.

**2. Document Ingestion Stage (Solving Scattered Records)**
- After successful verification, users can enter data from multiple laptops or departments (Eye Test room, Lab, OPD, Radiology, etc.).
- Users can either fill structured forms (example: eye test readings, vitals, diagnosis) or upload raw documents (PDFs, scanned prescriptions, lab reports, discharge summaries, handwritten notes).
- All uploaded files are stored in Firebase Storage.
- Metadata and file links are saved in the centralized `records` collection linked to the patient’s Aadhaar.
- This stage ensures that all previously scattered paper-based and digital records are brought into one unified storage system.

**3. AI Medical Documentation Agent Stage (Core of the System)**
- As soon as a document or new record is saved, the **AI Medical Documentation Agent** (built in SimStudio) is automatically triggered.
- The AI Agent performs the following intelligent tasks:
  - Reads and understands both uploaded files and structured input using OCR and natural language processing.
  - Extracts key medical information such as diagnoses, medicines with dosage, lab values, allergies, and medical history.
  - Converts all unstructured and fragmented data into standardized, consistent formats.
  - Generates professional clinical documents including OPD notes, SOAP notes, digital prescriptions, and follow-up advice.
  - Creates concise summaries of the patient’s complete medical history.
  - Detects potential drug interactions, flags missing information, and suggests ICD-10 codes.
  - Supports voice input from doctors, converting spoken consultation notes into structured documentation.
- The AI Agent directly solves the problems of lack of standardization, difficulty in retrieving accurate data, and high documentation workload.

**4. Centralized Storage & Standardization Stage**
- All original documents, AI-processed structured data, generated notes, and summaries are stored in a **single centralized `records` collection** in Firebase.
- Every record is permanently linked to the patient’s Aadhaar number.
- This creates one single source of truth, eliminating fragmented systems and making data interoperable across different healthcare providers.
- Both raw files (PDFs, images) and AI-generated structured outputs are saved together for complete transparency.

**5. Main Dashboard Access Stage**
- When the patient visits the main consultation area, they again perform independent biometric + Aadhaar verification using ESP32.
- After verification, the Main Dashboard loads all records from the centralized Firebase storage.
- The dashboard displays:
  - Complete medical history timeline
  - All uploaded documents with direct view links
  - AI-generated summaries and structured notes
  - Recent visits and key clinical insights
- Doctors can quickly search, view, and retrieve accurate patient information, solving the problem of difficult data access.

**6. Clinical Usage & Interoperability Stage**
- During consultation, doctors can query the AI Agent directly (e.g., “Show current medications” or “Summarize last 3 visits”).
- The AI Agent provides real-time intelligent assistance and generates fresh clinical documentation.
- All standardized records can be easily exported or shared with other hospitals, improving interoperability.
- The complete system reduces errors, saves time, lowers costs, and improves overall quality of patient care.


