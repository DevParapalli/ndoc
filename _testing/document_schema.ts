enum NDocumentType {
    PASSPORT = "PASSPORT",
    UIDAI_AADHAAR = "UIDAI_AADHAAR",
    DRIVERS_LICENSE = "DRIVERS_LICENSE",
    NATIONAL_ID = "NATIONAL_ID"
  }
  
  enum SecurityFeature {
    SIGNATURE = "SIGNATURE",
    MRZ = "MRZ",
    BIOMETRIC = "BIOMETRIC",
    HOLOGRAM = "HOLOGRAM",
    BARCODE = "BARCODE",
    QRCODE = "QRCODE",
    PHOTO = "PHOTO",
    WATERMARK = "WATERMARK",
    UV_FEATURES = "UV_FEATURES",
    FINGERPRINT = "FINGERPRINT"
  }
  
  interface DocumentSpecific {
    id: string;        // field identifier
    name: string;      // human readable name
    value: string | number | boolean | string[];  // flexible value type
    type?: string;     // optional type hint (e.g., "string", "array", "boolean")
  }
  
  interface DocumentSchema {
    metadata: {
      type: NDocumentType;
      country: string;
      issuing_authority: string;
      document_id: string;
      scan_timestamp?: string;
      scan_source?: string;
    };
    
    dates: {
      date_of_issue?: string;
      date_of_expiry?: string;
      date_of_birth?: string;
    };
  
    personal_info: {
      full_name: string;
      gender?: "MALE" | "FEMALE" | "OTHER" | "UNSPECIFIED"; // can we have a 56-valued array here ?
      nationality?: string;
      place_of_birth?: string;
    };
  
    contact_info: {
      address?: string;
      phone?: string;
      email?: string;
    };
  
    document_references?: { // used in cases where previous ID etc is mentioned, say old passport
      previous_document_id?: string;
      linked_documents?: Array<{
        type: NDocumentType;
        id: string;
      }>;
    };
  
    security_features: SecurityFeature[]; // Features present on the ID
  
    verification_status: { // This is the field that is majorly used by us. We properly populate this, then use all this data to create a JWT
      is_verified: boolean;
      confidence_score?: number;
      verification_timestamp?: string;
      verification_method?: string;
      verification_notes?: string;
      features_verified?: SecurityFeature[];
    };
  
    specifics: DocumentSpecific[];
  }