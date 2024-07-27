"use client";

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import CompanyForm from '../components/CompanyForm';
import PersonalForm from '../components/PersonalForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Trash2, Search } from 'lucide-react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

export default function Home() {
  const [type, setType] = useState('company');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShort, setIsShort] = useState(false);
  const personalFormRef = useRef(null);
  const companyFormRef = useRef(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('documentHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveHistory = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem('documentHistory', JSON.stringify(newHistory));
  };

  const handleGenerate = async () => {
    const formRef = type === 'company' ? companyFormRef : personalFormRef;
    const isValid = await formRef.current.submitForm();
  
    if (isValid && data) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/generate-docx', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, data, isShort }),
        });
  
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          const fileName = type === 'company' 
            ? `${data.companyNameEnglish} POA.docx`
            : `${data.fullNameEnglish} POA.docx`;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          
          const newHistoryItem = {
            type,
            data: {
              ...data,
              isShort,
            },
            timestamp: new Date().toISOString(),
            id: Date.now()
          };
          const newHistory = [newHistoryItem, ...history];
          saveHistory(newHistory);
        }
      } catch (error) {
        console.error('Error generating document:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDownloadAgain = async (historyItem) => {
    try {
      const response = await fetch('/api/generate-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: historyItem.type, 
          data: historyItem.data,
          isShort: historyItem.data.isShort
        }),
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        const fileName = historyItem.type === 'company' 
          ? `${historyItem.data.companyNameEnglish} POA.docx`
          : `${historyItem.data.fullNameEnglish} POA.docx`;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  const handleDeleteHistoryItem = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    saveHistory(newHistory);
  };

  const handleDeleteAllHistory = () => {
    saveHistory([]);
  };

  const filteredHistory = history.filter(item => {
    const searchValue = item.type === 'company' 
      ? `${item.data.companyName} ${item.data.companyNameEnglish} ${item.data.referenceNumber}`
      : `${item.data.fullName} ${item.data.fullNameEnglish} ${item.data.referenceNumber}`;
    return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex flex-col gap-20 lg:gap-0 lg:flex-row mt-8 items-center lg:items-start">
        <div className="lg:w-2/3 w-full pr-4">
          <Tabs value={type} onValueChange={setType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="company">Company POA</TabsTrigger>
              <TabsTrigger value="personal">Personal POA</TabsTrigger>
            </TabsList>
            <TabsContent value="company">
              <CompanyForm ref={companyFormRef} setData={setData} isShort={isShort} setIsShort={setIsShort} />
            </TabsContent>
            <TabsContent value="personal">
              <PersonalForm ref={personalFormRef} setData={setData} isShort={isShort} setIsShort={setIsShort} />
            </TabsContent>
          </Tabs>
          <Button
            onClick={handleGenerate}
            className="mt-4 w-full"
            disabled={isLoading || !data}
          >
            {isLoading ? 'Generating...' : 'Generate Document'}
          </Button>
        </div>
        <div className="w-full lg:w-1/3 pl-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">History</h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete All History</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete all history? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAllHistory}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or reference"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <ScrollArea className="h-[650px] w-full rounded-md border p-4">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <p className="font-semibold">
                    {item.type === 'company' ? 'Company' : 'Personal'} POA ({item.data.isShort ? 'Short' : 'Full'})
                  </p>
                  <p className="text-sm text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                  <p className="text-sm">
                    {item.type === 'company' 
                      ? `Company: ${item.data.companyName} (${item.data.companyNameEnglish})`
                      : `Name: ${item.data.fullName} (${item.data.fullNameEnglish})`
                    }
                  </p>
                  <p className="text-sm">Reference Number: {item.data.referenceNumber}</p>
                  <div className="flex justify-between mt-2">
                    <Button onClick={() => handleDownloadAgain(item)} className="w-3/4">
                      Download Again
                    </Button>
                    <Button 
                      onClick={() => handleDeleteHistoryItem(item.id)} 
                      variant="destructive"
                      className="w-1/5"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No generated documents at the moment.</p>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}