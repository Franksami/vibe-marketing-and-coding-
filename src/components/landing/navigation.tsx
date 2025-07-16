"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, User, Sparkles, ArrowRight, X } from "lucide-react";
import { LoginDialog } from "@/components/auth/login-dialog";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/branding/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Products", href: "/products", badge: "New" },
    { label: "How It Works", href: "#features" },
    { label: "Success Stories", href: "#business-models" },
    { label: "Pricing", href: "#pricing" },
    { label: "Community", href: "#community" },
    { label: "Free Resources", href: "/resources/cursor-rules" },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80 shadow-sm" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo className="transition-transform hover:scale-105" size="md" variant="white" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              <nav className="flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-sm font-medium text-gray-300 transition-all hover:text-orange-500 group whitespace-nowrap"
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-2 h-5 px-1.5 text-[10px]" variant="secondary">
                        {item.badge}
                      </Badge>
                    )}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-500 scale-x-0 transition-transform group-hover:scale-x-100" />
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              {status === "loading" ? (
                <div className="h-9 w-20 animate-pulse bg-muted rounded" />
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/library">My Library</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account">Account Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowLoginDialog(true)}
                    className="text-sm"
                  >
                    Sign In
                  </Button>
                  <Button 
                    asChild 
                    className="bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg transition-all duration-200 group"
                  >
                    <Link href="#pricing" className="flex items-center">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Start Building
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between mb-8">
                      <Logo size="md" variant="white" />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setIsOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-4 flex-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between text-base font-medium transition-colors hover:text-primary py-2"
                        >
                          {item.label}
                          {item.badge && (
                            <Badge className="h-5 px-1.5 text-[10px]" variant="secondary">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </nav>
                    
                    {/* Mobile Actions */}
                    <div className="space-y-4 pt-6 border-t">
                      {status === "loading" ? (
                        <div className="h-10 animate-pulse bg-muted rounded" />
                      ) : session ? (
                        <>
                          <div className="space-y-2 pb-4">
                            <p className="text-sm text-muted-foreground">Signed in as</p>
                            <p className="text-sm font-medium">{session.user?.email}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            asChild
                          >
                            <Link href="/library">My Library</Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => {
                              signOut();
                              setIsOpen(false);
                            }}
                          >
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => {
                              setShowLoginDialog(true);
                              setIsOpen(false);
                            }}
                          >
                            Sign In
                          </Button>
                          <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" asChild>
                            <Link href="#pricing" className="flex items-center justify-center">
                              <Sparkles className="mr-2 h-4 w-4" />
                              Start Building
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
}