// Context/authcontext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  selectedOption: string; 
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>; // Add updater function
  titles: string[]; // Add titles to the interface
  setTitles: React.Dispatch<React.SetStateAction<string[]>>;
  xlxs: Object[]; // Add titles to the interface
  setXlxs: React.Dispatch<React.SetStateAction<Object[]>>;
  formData:any,
  setFormData:any
  modal:any,
  setModal:any
  tempName:string,
  setTempName:React.Dispatch<React.SetStateAction<string>>
} 

interface FormData {
  name: string;
  description: string;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [selectedOption, setSelectedOption] = useState<string>(''); // State for selected option
  const [titles,setTitles] = useState<string[]>([])
  const [tempName,setTempName] = useState<string>('')
  const [xlxs,setXlxs] = useState<Object[]>([])
  const login = (email: string, password: string) => {
    const staticUsername = 'admin@gmail.com';
    const staticPassword = 'password123';

    if (email === staticUsername && password === staticPassword) {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: ''
  });

  const [modal,setModal]=useState(false)


  return (
    <AuthContext.Provider value={{tempName,setTempName, isAuthenticated,formData,modal,setModal, setFormData, login, logout, selectedOption, setSelectedOption ,titles,setTitles,xlxs,setXlxs}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
