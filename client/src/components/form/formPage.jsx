import styles from "./formpage.module.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { submitData } from "../../../api";
import { ToastDemo } from "../toast/toast";
"use client"


import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";

export const FormPage = () => {
  const nav=useNavigate()

  const { toast } = useToast()
  const [formData, setFormData] = useState({
    username: "",
    language: null,
    code: "",
    stdin: "",
  });

  function handleChanege(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  function handleLanguageChanege(e) {
    setFormData({
      ...formData,
      language: e.target.value,
    });
  }
  async function handleSubmit() {
    const res = await submitData(formData);
    if( res.errors){
      console.log(res.errors);
      toast({
        variant: "destructive",
        title: res.errors[0].message,
      })
    }
    else if(res.message){
      toast({
        variant: "success",
        title: res.message,
      })
    }
  }
  return (
    <>
      <div className={styles.form_page_wrapper}>
        <Card className="w-[100%] h-[100%] ">
          <CardHeader>
            <CardTitle>Add Code</CardTitle>
            <CardDescription>Add your information and code.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username..."
                    onChange={(e) => handleChanege(e)}
                  />
                </div>
                <div
                  className="flex flex-col space-y-1.5"
                  onChange={(e) => handleLanguageChanege(e)}
                >
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="C++">C++</SelectItem>
                      <SelectItem value="Java">Java</SelectItem>
                      <SelectItem value="Javascript">Javascript</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Code">Code</Label>
                  <Textarea
                    id="code"
                    placeholder="Type your code here."
                    className="h-96 resize-none"
                    onChange={(e) => handleChanege(e)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="stdin">stdin</Label>
                  <Textarea
                    id="stdin"
                    placeholder="Type your standard input here..."
                    className="resize-none"
                    onChange={(e) => handleChanege(e)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleSubmit()}>Submit</Button>
            <Button variant="outline" onClick={()=>{
              nav('/data')
            }}>All Submissions</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
