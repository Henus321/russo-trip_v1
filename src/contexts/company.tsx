import React, { createContext, useState, useEffect } from 'react';
import { db } from '../utils/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  Admin,
  City,
  CompanyContextState,
  Contact,
  Faq,
} from '../types/company';

const initialAdmin: Admin = {
  email: '',
  name: '',
  uid: '',
};

export const CompanyContext = createContext<CompanyContextState>({
  admin: initialAdmin,
  cities: [],
  contacts: [],
  faq: [],
});

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<Admin>(initialAdmin);
  const [cities, setCities] = useState<City[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [faq, setFaq] = useState<Faq[]>([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const docRef = doc(db, 'company', 'companyData');
        const docSnap = await getDoc(docRef);

        const company = docSnap.data();

        // HANDLE THIS???
        if (!company) throw new Error();
        const { admin, cities, contacts, faq } = company;

        setAdmin(admin);
        setCities(cities);
        setContacts(contacts);
        setFaq(faq);
        //  error type? error handle
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchCompanyData();
  }, []);

  const value = {
    cities,
    admin,
    contacts,
    faq,
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};
