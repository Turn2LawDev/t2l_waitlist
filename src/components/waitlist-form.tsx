"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Loader2, User, Mail, MapPin, Briefcase, MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  location: z.string().optional(),
  role: z.string().min(1, { message: "Please select your role." }),
  interests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Custom Input Component with HeroUI styling and moving glow
const HeroInput = ({ 
  label, 
  placeholder, 
  type = "text", 
  startContent, 
  endContent,
  value,
  onChange,
  error,
  ...props 
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const radius = 100;
  
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-white font-medium text-sm">{label}</label>
      <div className="relative">
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                hsl(var(--primary)),
                transparent 80%
              )
            `,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="group/input rounded-lg p-[2px] transition duration-300"
        >
          <div className={cn(
            "flex items-center w-full min-h-12 px-3 py-2 rounded-lg border-2 transition-all duration-300",
            "bg-gray-900 border-gray-700 text-white",
            isFocused ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50",
            error && "border-red-500"
          )}>
            {startContent && (
              <div className="flex items-center mr-3 text-gray-400">
                {startContent}
              </div>
            )}
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-sm"
              {...props}
            />
            {endContent && (
              <div className="flex items-center ml-3 text-gray-400">
                {endContent}
              </div>
            )}
          </div>
        </motion.div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Custom Select Component with HeroUI styling and moving glow
const HeroSelect = ({ 
  label, 
  placeholder, 
  startContent,
  value,
  onChange,
  error,
  children,
  ...props 
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const radius = 100;
  
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Extract options from children
  const options = React.Children.toArray(children).map((child: any) => ({
    value: child.props.value,
    label: child.props.children
  }));

  // Update selected label when value changes
  React.useEffect(() => {
    const selected = options.find(opt => opt.value === selectedValue);
    setSelectedLabel(selected ? selected.label : "");
  }, [selectedValue, options]);

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string, optionLabel: string) => {
    setSelectedValue(optionValue);
    setSelectedLabel(optionLabel);
    setIsOpen(false);
    setIsFocused(false);
    onChange({ target: { value: optionValue } });
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  return (
    <div className="flex flex-col space-y-2 w-full" ref={dropdownRef}>
      <label className="text-white font-medium text-sm">{label}</label>
      <div className="relative">
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                hsl(var(--primary)),
                transparent 80%
              )
            `,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="group/input rounded-lg p-[2px] transition duration-300"
        >
          <div className={cn(
            "flex items-center w-full min-h-12 px-3 py-2 rounded-lg border-2 transition-all duration-300",
            "bg-gray-900 border-gray-700 text-white",
            (isFocused || isOpen) ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50",
            error && "border-red-500"
          )}>
            {startContent && (
              <div className="flex items-center mr-3 text-gray-400">
                {startContent}
              </div>
            )}
            <div className="flex-1 text-sm text-left pointer-events-none">
              <span className={selectedValue ? "text-white" : "text-gray-400"}>
                {selectedLabel || placeholder}
              </span>
            </div>
            <button
              type="button"
              className="flex items-center ml-3 text-gray-400 hover:text-primary transition-colors p-1 focus:outline-none"
              onClick={toggleDropdown}
              tabIndex={0}
            >
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )} />
            </button>
          </div>
        </motion.div>
        
        {/* Custom Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border-2 border-primary/30 rounded-lg z-50 max-h-48 overflow-y-auto scrollbar-hide shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "w-full px-3 py-2 text-left cursor-pointer transition-colors duration-200 text-sm focus:outline-none",
                  "hover:bg-gray-800 hover:text-primary focus:bg-gray-800 focus:text-primary",
                  selectedValue === option.value ? "bg-gray-800 text-primary" : "text-white",
                  index === 0 && "rounded-t-lg",
                  index === options.length - 1 && "rounded-b-lg"
                )}
                onClick={() => handleSelect(option.value, option.label)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Custom Textarea Component with HeroUI styling and moving glow
const HeroTextarea = ({ 
  label, 
  placeholder, 
  startContent,
  value,
  onChange,
  error,
  rows = 3,
  ...props 
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const radius = 100;
  
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-white font-medium text-sm">{label}</label>
      <div className="relative">
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                hsl(var(--primary)),
                transparent 80%
              )
            `,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="group/input rounded-lg p-[2px] transition duration-300"
        >
          <div className={cn(
            "flex w-full px-3 py-2 rounded-lg border-2 transition-all duration-300",
            "bg-gray-900 border-gray-700 text-white",
            isFocused ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50",
            error && "border-red-500"
          )}>
            {startContent && (
              <div className="flex items-start pt-1 mr-3 text-gray-400">
                {startContent}
              </div>
            )}
            <textarea
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={rows}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-sm resize-none"
              {...props}
            />
          </div>
        </motion.div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Confetti Animation Button Component
interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

const ConfettiButton = ({ isLoading, disabled, children, onClick, ...props }: any) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonText, setButtonText] = useState("Secure My Spot →");

  const colors = ['#fbbf24', '#f59e0b', '#d97706', '#facc15', '#eab308'];

  const createConfetti = (centerX: number, centerY: number): ConfettiParticle[] => {
    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * -5 - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
        life: 0,
        maxLife: 60 + Math.random() * 40
      });
    }
    return particles;
  };

  const updateParticles = (particles: ConfettiParticle[]): ConfettiParticle[] => {
    return particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.15; // gravity
      particle.vx *= 0.99; // air resistance
      particle.life++;
      return particle.life < particle.maxLife;
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, particles: ConfettiParticle[]) => {
    particles.forEach(particle => {
      const alpha = 1 - (particle.life / particle.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
      ctx.restore();
    });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled || isAnimating) return;

    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (!canvas || !button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setIsAnimating(true);
    setButtonText("Sending...");

    // Create confetti particles
    let particles = createConfetti(centerX, centerY);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = updateParticles(particles);
      drawParticles(ctx, particles);

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    // Simulate loading
    setTimeout(() => {
      setButtonText("Success! ✓");
      setTimeout(() => {
        setIsAnimating(false);
        setButtonText("Secure My Spot →");
      }, 2000);
    }, 1000);

    // Call the actual onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: '100%', height: '100%' }}
      />
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled || isLoading || isAnimating}
        className={cn(
          "group/btn relative block h-12 w-full rounded-lg bg-primary font-bold text-black transition-all duration-300",
          "hover:bg-primary/90 hover:shadow-[0_0_20px_-5px_hsl(var(--primary))]",
          "focus:ring-2 focus:ring-primary/50 focus:shadow-[0_0_25px_-5px_hsl(var(--primary))]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isAnimating && "scale-95"
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mx-auto h-5 w-5 animate-spin" />
        ) : (
          <span className="transition-all duration-300">{buttonText}</span>
        )}
      </button>
    </>
  );
};

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      location: "",
      role: "",
      interests: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsLoading(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg bg-green-500/10 text-white h-full">
        <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
        <h3 className="font-headline text-2xl font-bold">You're on the list!</h3>
        <p className="text-gray-300 mt-2 max-w-sm">
          Thank you for joining. We'll be in touch with launch updates and exclusive perks.
        </p>
      </div>
    );
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl rounded-2xl p-4 md:p-8 bg-black">
      <form className="my-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4">
          <HeroInput
            label="Full Name"
            placeholder="Your full name"
            startContent={<User className="h-5 w-5" />}
            value={form.watch("fullName")}
            onChange={(e: any) => form.setValue("fullName", e.target.value)}
            error={form.formState.errors.fullName?.message}
          />
          <HeroInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            startContent={<Mail className="h-5 w-5" />}
            value={form.watch("email")}
            onChange={(e: any) => form.setValue("email", e.target.value)}
            error={form.formState.errors.email?.message}
          />
        </div>
        
        <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4">
          <HeroInput
            label="Location (City, Country)"
            placeholder="New Delhi, India"
            startContent={<MapPin className="h-5 w-5" />}
            value={form.watch("location")}
            onChange={(e: any) => form.setValue("location", e.target.value)}
            error={form.formState.errors.location?.message}
          />
          <HeroSelect
            label="Your Role"
            placeholder="I am a..."
            startContent={<Briefcase className="h-5 w-5" />}
            value={form.watch("role")}
            onChange={(e: any) => form.setValue("role", e.target.value)}
            error={form.formState.errors.role?.message}
          >
            <option value="individual" className="bg-gray-900 text-white">Individual needing legal help</option>
            <option value="business_owner" className="bg-gray-900 text-white">Business Owner/Manager</option>
            <option value="lawyer" className="bg-gray-900 text-white">Lawyer/Legal Professional</option>
            <option value="law_student" className="bg-gray-900 text-white">Law Student</option>
            <option value="investor" className="bg-gray-900 text-white">Investor/Partner</option>
            <option value="other" className="bg-gray-900 text-white">Other</option>
          </HeroSelect>
        </div>
        
        <HeroTextarea
          label="Your Message"
          placeholder="Tell us what kind of legal help or features you're looking for, like rent agreements, finding a lawyer, or legal FAQs."
          startContent={<MessageSquare className="h-5 w-5" />}
          value={form.watch("interests")}
          onChange={(e: any) => form.setValue("interests", e.target.value)}
          error={form.formState.errors.interests?.message}
          rows={3}
        />

        <ConfettiButton
          isLoading={isLoading}
          disabled={isLoading}
        >
          Secure My Spot →
        </ConfettiButton>
      </form>
    </div>
  );
}
