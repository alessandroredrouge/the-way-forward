import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    toast({
      title: "Thank you for subscribing!",
      description: "We'll notify you when we launch this feature.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center p-4">
      <div className="w-full max-w-3xl mx-auto pt-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="text-center max-w-3xl mx-auto flex-grow flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          The Way Forward
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          We will be launching this feature soon!
          <br />
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              Ready to make an impact?
            </span>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/auth">Join the community!</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Connect</h3>
            <p className="text-muted-foreground">
              Link challenges with innovative solutions
            </p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Collaborate</h3>
            <p className="text-muted-foreground">
              Work together with global changemakers
            </p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Create Impact</h3>
            <p className="text-muted-foreground">
              Drive meaningful change worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
