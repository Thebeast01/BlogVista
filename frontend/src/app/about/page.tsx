"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { API_URL } from "@/config/index";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GithubIcon,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  ChevronDown,
  Mail
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";


export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [sendMailData, setSendMailData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const teamref = useRef<HTMLDivElement>(null)

  const handlescroltoteam = () => {
    teamref.current?.scrollIntoView({ behavior: "smooth" })
  }
  const handleSendMessage = async (e: React.FormEvent) => {
    try {
      const response = await axios.post(`${API_URL}mail/send`, sendMailData)
      if (response.status === 200) {
        Swal.fire({
          title: "Message Sent",
          text: "Your message has been sent successfully!",
          icon: "success",
        })
        setSendMailData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  return (
    <main className="min-h-screen  ">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-background"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "brightness(0.8)",
            transform: `translateY(${scrollY * 0.4}px)`
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl text-foreground md:text-6xl font-bold  mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            The Story Behind Our Words
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Discover the passion and purpose that drives our digital ink
          </p>
          <Button
            onClick={handlescroltoteam}
            variant="secondary"
            size="lg"
            className="group animate-in fade-in slide-in-from-bottom-8 text-foreground duration-1000 delay-300"
          >
            Meet Our Team
            <ArrowRight className="ml-2 h-4 w-4 text-foreground transition-transform group-hover:translate-x-1" />
          </Button>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-foreground" />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto   ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">Our Mission</h2>
              <Separator className="w-24 h-1 bg-primary" />
            </div>
            <p className="text-lg text-muted-foreground">
              Founded in 2023, our blog was born from a shared passion for meaningful conversations and thoughtful exploration of ideas that matter.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe in the power of words to inspire change, foster understanding, and build communities. Every article we publish is carefully crafted to provide value, spark curiosity, and encourage reflection.
            </p>
            <p className="text-lg text-muted-foreground">
              Our commitment is to maintain the highest standards of journalistic integrity while delivering content that resonates with our diverse audience.
            </p>
          </div>
          <div className="aspect-video  relative  h-96 w-full">
            <Image
              src="/images"
              alt="Team meeting with creative ideas on whiteboard"
              fill
              className="object-cover  rounded-md "
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamref} className="py-24 px-6 bg-background ">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">Meet The Team</h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Our diverse team brings together expertise across various fields, united by a passion for storytelling and knowledge sharing.
          </p>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto ">
          {[
            {
              name: "Mohammad saif",
              role: "Backend Developer",
              bio: "saif  built a robust backend system, handling data flow and server logic with precision and reliability.",
              avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              linkedin: "https://www.linkedin.com/in/mohammad-saif01",
              twitter: "https://x.com/_beast0",
              github: "https://github.com/Thebeast01"
            },
            {
              name: "Shailja yadav ",
              role: "Frontend developer",
              bio: "shailja crafted an intuitive and responsive UI, ensuring a smooth and engaging user experience",
              avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              linkedin: "https://www.linkedin.com/in/shailja-yadav-643853252/",
              twitter: "https://x.com/Shailja5911",
              github: "https://github.com/shailjayadav30",
            }
          ].map((member, index) => (
            <Card key={index} className="  bg-card group p-6 hover:shadow-md transition-all duration-300 text-center h-full flex flex-col">
              <div className=" mx-auto">
                <Avatar className="h-24 w-24 border-4 border-background group-hover:border-primary transition-all duration-300">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-xl font-semibold ">{member.name}</h3>
              <p className="text-sm text-primary ">{member.role}</p>
              <Separator className="mb-2" />
              <p className="text-muted-foreground flex-grow">{member.bio}</p>
              <div className="flex justify-center gap-4 mt-1">
                <a target="_blank"
                  rel="noopener noreferrer" href={member.twitter}>
                  <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </a>

                <a target="_blank"
                  rel="noopener noreferrer" href={member.linkedin}>
                  <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
                <a target="_blank"
                  rel="noopener noreferrer" href={member.github}>
                  <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
                    <GithubIcon className="h-5 w-5" />
                  </Button></a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide our work and define our approach to creating content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Authenticity",
              description: "We believe in genuine voices and perspectives, avoiding formulaic content in favor of authentic expression that resonates with readers."
            },
            {
              title: "Curiosity",
              description: "We approach every topic with an open mind and a desire to explore deeper, asking questions that challenge conventional thinking."
            },
            {
              title: "Inclusivity",
              description: "We strive to represent diverse voices and perspectives, ensuring our content speaks to and respects our varied audience."
            },
            {
              title: "Excellence",
              description: "We maintain high standards for accuracy, clarity, and insight in everything we publish, constantly refining our craft."
            }
          ].map((value, index) => (
            <Card key={index} className="p-8 hover:shadow-md transition-all duration-300 hover:border-primary/50">
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Join Our Community</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter and be the first to receive new content, exclusive insights, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground text-foreground"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions, feedback, or want to collaborate? We would love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <p>hello@yourblog.com</p>
              </div>
              <div className="flex gap-4">
                <a target="_blank"
                  rel="noopener noreferrer" href="https://x.com">
                  <Button variant="ghost" size="icon" className="rounded-full ">
                    <Twitter className="h-5 w-5" />
                  </Button></a>
                <a target="_blank"
                  rel="noopener noreferrer" href="https://www.instagram.com">
                  <Button variant="ghost" size="icon" className="rounded-full ">
                    <Instagram className="h-5 w-5" />
                  </Button></a>
                <a href="https://www.linkedin.com" target="_blank"
                  rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="rounded-full ">
                    <Linkedin className="h-5 w-5" />
                  </Button></a>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 ">
                  <label htmlFor="name" className="  text-sm font-medium ">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="mt-2" name="name" value={sendMailData.name} onChange={(e) => setSendMailData({ ...sendMailData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" className="mt-2" value={sendMailData.email} onChange={(e) => setSendMailData({ ...sendMailData, email: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="Message subject" className="mt-2" value={sendMailData.subject} onChange={(e) => setSendMailData({ ...sendMailData, subject: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium ">
                  Message
                </label>
                <textarea
                  id="message"
                  value={sendMailData.message}
                  rows={5}
                  className=" mt-2 w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Your message"
                  onChange={(e) => setSendMailData({ ...sendMailData, message: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleSendMessage}>Send Message</Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
