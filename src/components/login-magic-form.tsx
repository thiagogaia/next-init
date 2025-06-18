import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/i18n/language-switcher";
import { useTranslations } from "next-intl";

export function LoginMagicForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const t = useTranslations();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex justify-between items-center">
            <div>{t('Login')}</div>
            <div>
              <LanguageSwitcher />
            </div>
          </CardTitle>
          <CardDescription>
            {t('Enter your email below to login to your account')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                {t('Login')}
              </Button>
              
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
