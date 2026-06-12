'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { PasswordInput } from '@/components/ui/password-input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/libs/utils';
import type { VariantProps } from 'class-variance-authority';
import {
  AlertCircle,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronRight,
  Heart,
  Italic,
  Mail,
  Search,
  Settings,
  Star,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>['variant']
>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

const BUTTON_VARIANTS: ButtonVariant[] = [
  'default',
  'primary',
  'subtle',
  'destructive',
  'destructiveSubtle',
  'outline',
  'outlineSuccess',
  'outlineWarning',
  'outlineDestructive',
  'secondary',
  'ghost',
  'ghostPrimary',
  'ghostDestructive',
  'link',
  'accent',
  'muted',
  'success',
];

const BUTTON_SIZES: ButtonSize[] = ['sm', 'default', 'lg'];

const BADGE_VARIANTS = [
  'default',
  'secondary',
  'success',
  'warning',
  'destructive',
  'outline',
  'successSubtle',
  'primaryOutline',
  'successOutline',
  'warningOutline',
  'destructiveOutline',
] as const;

const PROGRESS_VARIANTS = ['default', 'success', 'destructive'] as const;

const COMBOBOX_OPTIONS = [
  { label: 'Next.js', value: 'next' },
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Tailwind CSS', value: 'tailwind' },
];

const SECTIONS = [
  { id: 'actions', key: 'actions' },
  { id: 'forms', key: 'forms' },
  { id: 'feedback', key: 'feedback' },
  { id: 'data-display', key: 'dataDisplay' },
  { id: 'navigation', key: 'navigation' },
  { id: 'overlays', key: 'overlays' },
  { id: 'layout', key: 'layout' },
] as const;

function ShowcaseSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

function ComponentBlock({
  title,
  children,
  className,
  cardClassName,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  cardClassName?: string;
}) {
  return (
    <Card className={cn('gap-0 overflow-hidden py-0', cardClassName)}>
      <CardHeader className="border-b bg-muted/30 py-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className={cn('space-y-6 py-6', className)}>
        {children}
      </CardContent>
    </Card>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  );
}

function VariantGrid({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

function FormShowcase() {
  const form = useForm({
    defaultValues: { email: '', bio: '' },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => undefined)}
        className="max-w-md space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>Used for account notifications.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export function UiComponentsShowcase() {
  const t = useTranslations('uiComponents');
  const [comboboxValue, setComboboxValue] = useState('next');
  const [dropdownChecked, setDropdownChecked] = useState(true);
  const [dropdownRadio, setDropdownRadio] = useState('comfortable');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [progress, setProgress] = useState(45);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [showAlert, setShowAlert] = useState(true);
  const [showDestructiveAlert, setShowDestructiveAlert] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visible[0]?.target.id;
        if (id) setActiveSection(id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <TooltipProvider>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 lg:flex-row lg:gap-12">
        <aside className="hidden shrink-0 text-sidebar-foreground lg:block lg:w-48">
          <nav className="sticky top-24 space-y-1">
            <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {t('onThisPage')}
            </p>
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  activeSection === section.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
              >
                {t(`sections.${section.key}`)}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 space-y-16">
          <header className="space-y-2 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </header>

          <ShowcaseSection
            id="actions"
            title={t('sections.actions')}
            description={t('sections.actionsDesc')}
          >
            <ComponentBlock title="Button">
              <SubLabel>Variants</SubLabel>
              <VariantGrid>
                {BUTTON_VARIANTS.map((variant) => (
                  <Button key={variant} variant={variant}>
                    {variant}
                  </Button>
                ))}
              </VariantGrid>
              <SubLabel>Sizes</SubLabel>
              <VariantGrid>
                {BUTTON_SIZES.map((size) => (
                  <Button key={size} size={size}>
                    {size}
                  </Button>
                ))}
                <Button size="icon" aria-label="Star">
                  <Star className="size-4" />
                </Button>
                <Button size="icon-sm" aria-label="Star">
                  <Star className="size-4" />
                </Button>
                <Button size="icon-lg" aria-label="Star">
                  <Star className="size-4" />
                </Button>
              </VariantGrid>
              <SubLabel>States</SubLabel>
              <VariantGrid>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </VariantGrid>
            </ComponentBlock>

            <ComponentBlock title="Button Group">
              <SubLabel>Horizontal</SubLabel>
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <ButtonGroupSeparator />
                <Button variant="outline">Center</Button>
                <ButtonGroupSeparator />
                <Button variant="outline">Right</Button>
              </ButtonGroup>
              <SubLabel>With text addon</SubLabel>
              <ButtonGroup>
                <ButtonGroupText>https://</ButtonGroupText>
                <Button variant="outline">Copy</Button>
              </ButtonGroup>
              <SubLabel>Vertical</SubLabel>
              <ButtonGroup orientation="vertical" className="w-fit">
                <Button variant="outline" size="sm">
                  Top
                </Button>
                <Button variant="outline" size="sm">
                  Middle
                </Button>
                <Button variant="outline" size="sm">
                  Bottom
                </Button>
              </ButtonGroup>
            </ComponentBlock>

            <ComponentBlock title="Toggle">
              <SubLabel>Variants</SubLabel>
              <VariantGrid>
                <Toggle aria-label="Bold">
                  <Bold className="size-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="Italic">
                  <Italic className="size-4" />
                </Toggle>
              </VariantGrid>
              <SubLabel>Sizes</SubLabel>
              <VariantGrid>
                <Toggle size="sm" aria-label="Align left">
                  <AlignLeft className="size-4" />
                </Toggle>
                <Toggle size="default" aria-label="Align center">
                  <AlignCenter className="size-4" />
                </Toggle>
                <Toggle size="lg" aria-label="Align right">
                  <AlignRight className="size-4" />
                </Toggle>
              </VariantGrid>
            </ComponentBlock>

            <ComponentBlock title="Toggle Group">
              <SubLabel>Single</SubLabel>
              <ToggleGroup type="single" defaultValue="left">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft className="size-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="size-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="size-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              <SubLabel>Multiple</SubLabel>
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Bold">
                  <Bold className="size-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                  <Italic className="size-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </ComponentBlock>
          </ShowcaseSection>

          <ShowcaseSection
            id="forms"
            title={t('sections.forms')}
            description={t('sections.formsDesc')}
          >
            <ComponentBlock title="Input">
              <SubLabel>States</SubLabel>
              <div className="grid max-w-md gap-4">
                <Input placeholder="Default input" />
                <Input placeholder="Disabled" disabled />
                <Input placeholder="Invalid" aria-invalid />
              </div>
            </ComponentBlock>

            <ComponentBlock title="Textarea">
              <SubLabel>States</SubLabel>
              <div className="grid max-w-md gap-4">
                <Textarea placeholder="Write something..." />
                <Textarea placeholder="Disabled" disabled />
                <Textarea placeholder="Invalid" aria-invalid />
              </div>
            </ComponentBlock>

            <ComponentBlock title="Label">
              <div className="flex max-w-md flex-col gap-2">
                <Label htmlFor="demo-email">Email address</Label>
                <Input id="demo-email" placeholder="you@example.com" />
              </div>
            </ComponentBlock>

            <ComponentBlock title="Select">
              <div className="max-w-xs">
                <Select defaultValue="react">
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Checkbox">
              <div className="grid max-w-md gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="terms-disabled" disabled />
                  <Label htmlFor="terms-disabled">Disabled</Label>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Radio Group">
              <div className="max-w-xs">
                <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Default</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Comfortable</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Compact</Label>
                  </div>
                </RadioGroup>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Switch">
              <div className="grid max-w-md gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="airplane" />
                  <Label htmlFor="airplane">Airplane mode</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="airplane-disabled" disabled />
                  <Label htmlFor="airplane-disabled">Disabled</Label>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Combobox">
              <div className="max-w-xs">
                <Combobox
                  options={COMBOBOX_OPTIONS}
                  value={comboboxValue}
                  onChange={setComboboxValue}
                  placeholder="Select framework"
                />
              </div>
            </ComponentBlock>

            <ComponentBlock title="Input Group">
              <div className="grid max-w-md gap-6">
                <div>
                  <SubLabel>Start addon</SubLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <Mail className="size-4" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Email" />
                  </InputGroup>
                </div>
                <div>
                  <SubLabel>End addon</SubLabel>
                  <InputGroup>
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton>
                        <Search className="size-4" />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div>
                  <SubLabel>Textarea</SubLabel>
                  <InputGroup>
                    <InputGroupTextarea placeholder="Write a message..." />
                  </InputGroup>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Input OTP">
              <div className="w-fit">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Password Input">
              <div className="grid max-w-md gap-6">
                <div>
                  <SubLabel>Default</SubLabel>
                  <div className="max-w-xs">
                    <PasswordInput placeholder="Enter password" />
                  </div>
                </div>
                <div>
                  <SubLabel>With error</SubLabel>
                  <div className="max-w-xs">
                    <PasswordInput
                      placeholder="With error"
                      error
                      errorMessage="Password is required"
                    />
                  </div>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Input Error">
              <div className="grid max-w-md gap-2">
                <Label htmlFor="demo-error-input">Username</Label>
                <Input
                  id="demo-error-input"
                  placeholder="johndoe"
                  aria-invalid
                />
                <InputError message="This field is required" />
              </div>
            </ComponentBlock>

            <ComponentBlock title="Form">
              <FormShowcase />
            </ComponentBlock>
          </ShowcaseSection>

          <ShowcaseSection
            id="feedback"
            title={t('sections.feedback')}
            description={t('sections.feedbackDesc')}
          >
            <ComponentBlock title="Alert">
              <SubLabel>Interactive</SubLabel>
              <div className="mb-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAlert((p) => !p)}
                >
                  Toggle Default Alert
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDestructiveAlert((p) => !p)}
                >
                  Toggle Destructive Alert
                </Button>
              </div>
              <SubLabel>Variants</SubLabel>
              <div className="grid gap-4">
                {showAlert && (
                  <Alert>
                    <AlertCircle className="size-4" />
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>
                      Default alert for general information.
                    </AlertDescription>
                  </Alert>
                )}
                {showDestructiveAlert && (
                  <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Destructive alert for critical messages.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </ComponentBlock>

            <ComponentBlock title="Badge">
              <SubLabel>Variants</SubLabel>
              <VariantGrid>
                {BADGE_VARIANTS.map((variant) => (
                  <Badge key={variant} variant={variant}>
                    {variant}
                  </Badge>
                ))}
              </VariantGrid>
            </ComponentBlock>

            <ComponentBlock title="Progress">
              <SubLabel>Variants</SubLabel>
              <div className="max-w-md space-y-4">
                {PROGRESS_VARIANTS.map((variant) => (
                  <Progress key={variant} value={progress} variant={variant} />
                ))}
              </div>
              <SubLabel>Interactive</SubLabel>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setProgress((p) => Math.max(0, p - 10))}
                >
                  -10
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setProgress((p) => Math.min(100, p + 10))}
                >
                  +10
                </Button>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Spinner">
              <Spinner className="size-6" />
            </ComponentBlock>

            <ComponentBlock title="Skeleton">
              <SubLabel>Profile placeholder</SubLabel>
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </ComponentBlock>
          </ShowcaseSection>

          <ShowcaseSection
            id="data-display"
            title={t('sections.dataDisplay')}
            description={t('sections.dataDisplayDesc')}
          >
            <ComponentBlock title="Avatar">
              <div className="grid gap-6">
                <div>
                  <SubLabel>With image</SubLabel>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <SubLabel>Fallback</SubLabel>
                  <Avatar>
                    <AvatarFallback>NE</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Card">
              <div className="grid gap-6">
                <div>
                  <SubLabel>With footer</SubLabel>
                  <Card className="max-w-sm">
                    <CardHeader>
                      <CardTitle>Card title</CardTitle>
                      <CardDescription>Card description text.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Card content area for any layout.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="sm"
                        onClick={() => toast.success('Action clicked!')}
                      >
                        Action
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <div>
                  <SubLabel>With action</SubLabel>
                  <Card className="max-w-sm">
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Manage your alerts.</CardDescription>
                      <CardAction>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast.info('Settings clicked!')}
                        >
                          Settings
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Card with a header action slot.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Table">
              <Table>
                <TableCaption>Team members and their roles.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Alice</TableCell>
                    <TableCell>
                      <Badge variant="success">Active</Badge>
                    </TableCell>
                    <TableCell>Admin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Away</Badge>
                    </TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell>2 members</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </ComponentBlock>

            <ComponentBlock title="Separator">
              <div className="space-y-2">
                <p className="text-sm">Above separator</p>
                <Separator />
                <p className="text-sm">Below separator</p>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Icon">
              <SubLabel>Lucide icons</SubLabel>
              <div className="flex items-center gap-4">
                <Icon iconNode={Heart} className="size-6 text-destructive" />
                <Icon iconNode={Star} className="size-6 text-warning" />
                <Icon iconNode={Settings} className="size-6 text-primary" />
              </div>
            </ComponentBlock>

            <ComponentBlock title="Placeholder Pattern">
              <div className="relative h-32 overflow-hidden rounded-lg border">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-muted-foreground/20" />
              </div>
            </ComponentBlock>
          </ShowcaseSection>

          <ShowcaseSection
            id="navigation"
            title={t('sections.navigation')}
            description={t('sections.navigationDesc')}
          >
            <ComponentBlock title="Breadcrumb">
              <div className="grid gap-6">
                <div>
                  <SubLabel>Default</SubLabel>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/ui-components">
                          Components
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div>
                  <SubLabel>With ellipsis</SubLabel>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Current</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock title="Tabs">
              <Tabs defaultValue="account" className="max-w-md">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="pt-4 text-sm">
                  Manage your account settings.
                </TabsContent>
                <TabsContent value="password" className="pt-4 text-sm">
                  Change your password here.
                </TabsContent>
                <TabsContent value="settings" className="pt-4 text-sm">
                  Configure app preferences.
                </TabsContent>
              </Tabs>
            </ComponentBlock>

            <ComponentBlock
              title="Navigation Menu"
              cardClassName="overflow-visible"
            >
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      Getting started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-48 gap-2 p-4">
                        <li>
                          <NavigationMenuLink
                            href="/"
                            className="block rounded-md p-2 text-sm hover:bg-accent"
                          >
                            Introduction
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            href="/about"
                            className="block rounded-md p-2 text-sm hover:bg-accent"
                          >
                            About
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/ui-components"
                      className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent"
                    >
                      Components
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </ComponentBlock>
          </ShowcaseSection>

          <ShowcaseSection
            id="overlays"
            title={t('sections.overlays')}
            description={t('sections.overlaysDesc')}
          >
            <ComponentBlock title="Dialog">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>
                      Dialog description with actions below.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ComponentBlock>

            <ComponentBlock title="Sheet">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet title</SheetTitle>
                    <SheetDescription>
                      Slide-over panel from the edge of the screen.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </ComponentBlock>

            <ComponentBlock title="Popover">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <p className="text-sm">
                    Popover content for contextual actions or info.
                  </p>
                </PopoverContent>
              </Popover>
            </ComponentBlock>

            <ComponentBlock title="Tooltip">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip content</TooltipContent>
              </Tooltip>
            </ComponentBlock>

            <ComponentBlock title="Dropdown Menu">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuCheckboxItem
                    checked={dropdownChecked}
                    onCheckedChange={setDropdownChecked}
                  >
                    Show notifications
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={dropdownRadio}
                    onValueChange={setDropdownRadio}
                  >
                    <DropdownMenuRadioItem value="default">
                      Default
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="comfortable">
                      Comfortable
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      More options
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuItem>Import</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentBlock>
          </ShowcaseSection>

          <ShowcaseSection
            id="layout"
            title={t('sections.layout')}
            description={t('sections.layoutDesc')}
          >
            <ComponentBlock title="Accordion">
              <SubLabel>Single collapsible</SubLabel>
              <Accordion type="single" collapsible className="max-w-lg">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It uses Radix UI primitives under the hood.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It matches your boilerplate theme tokens.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComponentBlock>

            <ComponentBlock title="Collapsible">
              <Collapsible
                open={collapsibleOpen}
                onOpenChange={setCollapsibleOpen}
                className="max-w-md space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">3 starred repositories</p>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronRight
                        className={cn(
                          'size-4 transition-transform',
                          collapsibleOpen && 'rotate-90',
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md border px-4 py-2 text-sm">
                    next-elite
                  </div>
                  <div className="rounded-md border px-4 py-2 text-sm">
                    shadcn-ui
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </ComponentBlock>

            <ComponentBlock title="Carousel">
              <Carousel className="mx-auto max-w-sm">
                <CarouselContent>
                  {['Slide 1', 'Slide 2', 'Slide 3'].map((slide) => (
                    <CarouselItem key={slide}>
                      <div className="flex h-32 items-center justify-center rounded-lg border bg-muted/50">
                        <span className="text-lg font-medium">{slide}</span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="top-1/2 left-2 -translate-y-1/2" />
                <CarouselNext className="top-1/2 right-2 -translate-y-1/2" />
              </Carousel>
            </ComponentBlock>

            <ComponentBlock title="Calendar">
              <SubLabel>Single date</SubLabel>
              <div className="w-fit">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border"
                />
              </div>
            </ComponentBlock>
          </ShowcaseSection>
        </div>
      </div>
    </TooltipProvider>
  );
}
