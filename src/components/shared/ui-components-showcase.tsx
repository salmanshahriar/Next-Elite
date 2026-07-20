'use client';

import { PageHeader } from '@/components/shared/page-header';
import TextLink from '@/components/shared/text-link';
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
  SheetBody,
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
  Moon,
  Search,
  Settings,
  Star,
  Sun,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>['variant']
>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;
type ScrollSpyEntry = { id: string; element: HTMLElement };

const SCROLL_LOCK_MS = 700;

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
  {
    id: 'actions',
    key: 'actions',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'button-group', label: 'Button Group' },
      { id: 'toggle', label: 'Toggle' },
      { id: 'toggle-group', label: 'Toggle Group' },
    ],
  },
  {
    id: 'forms',
    key: 'forms',
    items: [
      { id: 'input', label: 'Input' },
      { id: 'textarea', label: 'Textarea' },
      { id: 'label', label: 'Label' },
      { id: 'select', label: 'Select' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio-group', label: 'Radio Group' },
      { id: 'switch', label: 'Switch' },
      { id: 'combobox', label: 'Combobox' },
      { id: 'input-group', label: 'Input Group' },
      { id: 'input-otp', label: 'Input OTP' },
      { id: 'password-input', label: 'Password Input' },
      { id: 'input-error', label: 'Input Error' },
      { id: 'form', label: 'Form' },
    ],
  },
  {
    id: 'feedback',
    key: 'feedback',
    items: [
      { id: 'alert', label: 'Alert' },
      { id: 'toast', label: 'Toast' },
      { id: 'badge', label: 'Badge' },
      { id: 'progress', label: 'Progress' },
      { id: 'spinner', label: 'Spinner' },
      { id: 'skeleton', label: 'Skeleton' },
    ],
  },
  {
    id: 'data-display',
    key: 'dataDisplay',
    items: [
      { id: 'avatar', label: 'Avatar' },
      { id: 'card', label: 'Card' },
      { id: 'table', label: 'Table' },
      { id: 'separator', label: 'Separator' },
      { id: 'icon', label: 'Icon' },
      { id: 'placeholder-pattern', label: 'Placeholder Pattern' },
    ],
  },
  {
    id: 'navigation',
    key: 'navigation',
    items: [
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'text-link', label: 'Text Link' },
      { id: 'navigation-menu', label: 'Navigation Menu' },
    ],
  },
  {
    id: 'overlays',
    key: 'overlays',
    items: [
      { id: 'dialog', label: 'Dialog' },
      { id: 'sheet', label: 'Sheet' },
      { id: 'popover', label: 'Popover' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'dropdown-menu', label: 'Dropdown Menu' },
    ],
  },
  {
    id: 'layout',
    key: 'layout',
    items: [
      { id: 'accordion', label: 'Accordion' },
      { id: 'collapsible', label: 'Collapsible' },
      { id: 'carousel', label: 'Carousel' },
      { id: 'calendar', label: 'Calendar' },
    ],
  },
] as const;

const COMPONENT_IDS = SECTIONS.flatMap((section) =>
  section.items.map((item) => `${section.id}-${item.id}`),
);

const DEFAULT_COMPONENT_ID = COMPONENT_IDS[0] ?? 'actions-button';

const SECTION_BY_COMPONENT_ID = new Map<string, string>(
  SECTIONS.flatMap((section) =>
    section.items.map(
      (item) => [`${section.id}-${item.id}`, section.id] as const,
    ),
  ),
);

function getSectionIdForTarget(id: string) {
  return SECTION_BY_COMPONENT_ID.get(id);
}

function isKnownComponentId(id: string) {
  return SECTION_BY_COMPONENT_ID.has(id);
}

function collectScrollSpyEntries(ids: readonly string[]) {
  return ids.flatMap((id) => {
    const element = document.getElementById(id);
    return element ? [{ id, element }] : [];
  });
}

function resolveActiveComponentId(
  entries: readonly ScrollSpyEntry[],
  fallbackId: string,
) {
  if (!entries.length) return fallbackId;

  const viewportCenter = window.innerHeight / 2;
  let closestId = fallbackId;
  let closestDistance = Infinity;

  for (const { id, element } of entries) {
    const rect = element.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestId = id;
    }
  }

  return closestId;
}

function scrollToComponentCenter(
  element: HTMLElement,
  behavior: ScrollBehavior = 'auto',
) {
  const rect = element.getBoundingClientRect();
  const top =
    rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
  window.scrollTo({ top, behavior });
}

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
    <section
      id={id}
      className="scroll-mt-24 space-y-6 [contain-intrinsic-size:auto_800px] [content-visibility:auto]"
    >
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
  id,
  title,
  children,
  className,
  cardClassName,
  allowOverflow = false,
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
  cardClassName?: string;
  allowOverflow?: boolean;
}) {
  return (
    <Card
      flat
      id={id}
      className={cn(
        'scroll-mt-24 gap-0 overflow-hidden py-0',
        allowOverflow && '!overflow-visible',
        cardClassName,
      )}
    >
      <CardHeader className="border-b bg-muted/30 py-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          'space-y-6 py-6',
          allowOverflow && '!overflow-visible',
          className,
        )}
      >
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

function OnThisPageNav({
  activeTarget,
  activeSectionId,
  openSection,
  onToggleSection,
  onNavigate,
  label,
}: {
  activeTarget: string;
  activeSectionId: string | undefined;
  openSection: string | null;
  onToggleSection: (sectionId: string, open: boolean) => void;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, itemId: string) => void;
  label: string;
}) {
  const t = useTranslations('uiComponents');
  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const link = activeLinkRef.current;
    const nav = navRef.current;
    if (!link || !nav) return;

    const linkTop = link.offsetTop;
    const linkBottom = linkTop + link.offsetHeight;
    const viewTop = nav.scrollTop;
    const viewBottom = viewTop + nav.clientHeight;

    if (linkTop < viewTop || linkBottom > viewBottom) {
      link.scrollIntoView({ block: 'nearest' });
    }
  }, [activeTarget]);

  return (
    <nav
      ref={navRef}
      className="sticky top-24 max-h-[calc(100vh-8rem)] space-y-1 overflow-y-auto overscroll-y-contain pr-1"
    >
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      {SECTIONS.map((section) => {
        const isActiveSection = activeSectionId === section.id;
        const isExpanded = openSection === section.id || isActiveSection;

        return (
          <Collapsible
            key={section.id}
            open={isExpanded}
            onOpenChange={(open) => onToggleSection(section.id, open)}
          >
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronRight
                  className={cn(
                    'mr-1 size-3.5 shrink-0 transition-transform duration-200',
                    isExpanded && 'rotate-90',
                  )}
                />
                {t(`sections.${section.key}`)}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0.5 overflow-hidden pl-4 data-[state=closed]:animate-none data-[state=open]:animate-none">
              {section.items.map((item) => {
                const itemId = `${section.id}-${item.id}`;
                const isItemActive = activeTarget === itemId;

                return (
                  <a
                    key={item.id}
                    ref={isItemActive ? activeLinkRef : undefined}
                    href={`#${itemId}`}
                    onClick={(event) => onNavigate(event, itemId)}
                    className={cn(
                      'block rounded-md px-3 py-1.5 text-xs transition-colors',
                      isItemActive
                        ? 'bg-primary/5 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-sidebar-accent/30 hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </nav>
  );
}

function useScrollSpy() {
  const initialSectionId =
    getSectionIdForTarget(DEFAULT_COMPONENT_ID) ?? SECTIONS[0].id;

  const [activeTarget, setActiveTarget] = useState(DEFAULT_COMPONENT_ID);
  const [openSection, setOpenSection] = useState<string | null>(
    initialSectionId,
  );

  const entriesRef = useRef<ScrollSpyEntry[]>([]);
  const scrollLockRef = useRef(false);
  const manualOverrideRef = useRef(false);
  const activeTargetRef = useRef(activeTarget);

  useEffect(() => {
    activeTargetRef.current = activeTarget;
  }, [activeTarget]);

  const activeSectionId = getSectionIdForTarget(activeTarget);

  const syncOpenSection = useCallback((componentId: string) => {
    const sectionId = getSectionIdForTarget(componentId);
    if (sectionId) setOpenSection(sectionId);
  }, []);

  const releaseScrollLock = useCallback(() => {
    window.setTimeout(() => {
      scrollLockRef.current = false;
    }, SCROLL_LOCK_MS);
  }, []);

  const navigateTo = useCallback(
    (componentId: string, behavior: ScrollBehavior = 'smooth') => {
      const element = document.getElementById(componentId);
      if (!element) return;

      scrollLockRef.current = true;
      manualOverrideRef.current = false;
      scrollToComponentCenter(element, behavior);

      activeTargetRef.current = componentId;
      setActiveTarget(componentId);
      syncOpenSection(componentId);
      window.history.replaceState(null, '', `#${componentId}`);
      releaseScrollLock();
    },
    [releaseScrollLock, syncOpenSection],
  );

  const handleToggleSection = useCallback(
    (sectionId: string, open: boolean) => {
      const currentActiveSection = getSectionIdForTarget(
        activeTargetRef.current,
      );

      if (!open && sectionId === currentActiveSection) return;

      manualOverrideRef.current = true;
      setOpenSection(open ? sectionId : (currentActiveSection ?? null));
    },
    [],
  );

  const handleNavigate = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, componentId: string) => {
      event.preventDefault();
      navigateTo(componentId, 'smooth');
    },
    [navigateTo],
  );

  useEffect(() => {
    entriesRef.current = collectScrollSpyEntries(COMPONENT_IDS);

    let frame = 0;

    const onScroll = () => {
      if (scrollLockRef.current) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextId = resolveActiveComponentId(
          entriesRef.current,
          activeTargetRef.current,
        );

        if (nextId === activeTargetRef.current) return;

        activeTargetRef.current = nextId;
        setActiveTarget(nextId);
        manualOverrideRef.current = false;
        syncOpenSection(nextId);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const hash = window.location.hash.slice(1);
    if (isKnownComponentId(hash)) {
      window.setTimeout(() => navigateTo(hash, 'auto'), 0);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [navigateTo, syncOpenSection]);

  return {
    activeTarget,
    activeSectionId,
    openSection,
    handleToggleSection,
    handleNavigate,
  };
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
  const {
    activeTarget,
    activeSectionId,
    openSection,
    handleToggleSection,
    handleNavigate,
  } = useScrollSpy();
  const [comboboxValue, setComboboxValue] = useState('next');
  const [dropdownChecked, setDropdownChecked] = useState(true);
  const [dropdownRadio, setDropdownRadio] = useState('comfortable');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [progress, setProgress] = useState(45);
  const [showAlert, setShowAlert] = useState(true);
  const [showDestructiveAlert, setShowDestructiveAlert] = useState(true);

  return (
    <TooltipProvider>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 lg:flex-row lg:gap-12">
        <aside className="hidden shrink-0 text-sidebar-foreground lg:block lg:w-56">
          <OnThisPageNav
            activeTarget={activeTarget}
            activeSectionId={activeSectionId}
            openSection={openSection}
            onToggleSection={handleToggleSection}
            onNavigate={handleNavigate}
            label={t('onThisPage')}
          />
        </aside>

        <div className="min-w-0 flex-1 space-y-16 overflow-x-clip">
          <PageHeader title={t('title')} subtitle={t('description')} />

          <ShowcaseSection
            id="actions"
            title={t('sections.actions')}
            description={t('sections.actionsDesc')}
          >
            <ComponentBlock id="actions-button" title="Button">
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

            <ComponentBlock id="actions-button-group" title="Button Group">
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

            <ComponentBlock id="actions-toggle" title="Toggle">
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

            <ComponentBlock id="actions-toggle-group" title="Toggle Group">
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
            <ComponentBlock id="forms-input" title="Input">
              <SubLabel>States</SubLabel>
              <div className="grid max-w-md gap-4">
                <Input placeholder="Default input" />
                <Input placeholder="Disabled" disabled />
                <Input placeholder="Invalid" aria-invalid />
              </div>
            </ComponentBlock>

            <ComponentBlock id="forms-textarea" title="Textarea">
              <SubLabel>States</SubLabel>
              <div className="grid max-w-md gap-4">
                <Textarea placeholder="Write something..." />
                <Textarea placeholder="Disabled" disabled />
                <Textarea placeholder="Invalid" aria-invalid />
              </div>
            </ComponentBlock>

            <ComponentBlock id="forms-label" title="Label">
              <div className="flex max-w-md flex-col gap-2">
                <Label htmlFor="demo-email">Email address</Label>
                <Input id="demo-email" placeholder="you@example.com" />
              </div>
            </ComponentBlock>

            <ComponentBlock id="forms-select" title="Select">
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

            <ComponentBlock id="forms-checkbox" title="Checkbox">
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

            <ComponentBlock id="forms-radio-group" title="Radio Group">
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

            <ComponentBlock id="forms-switch" title="Switch">
              <div className="grid max-w-md gap-6">
                <div>
                  <SubLabel>Sizes</SubLabel>
                  <VariantGrid>
                    <div className="flex items-center gap-2">
                      <Switch id="airplane-default" />
                      <Label htmlFor="airplane-default">Default Size</Label>
                    </div>
                    <div className="ml-6 flex items-center gap-2">
                      <Switch id="airplane-lg" size="lg" />
                      <Label htmlFor="airplane-lg">Large Size</Label>
                    </div>
                  </VariantGrid>
                </div>

                <div>
                  <SubLabel>With Icons</SubLabel>
                  <VariantGrid>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="switch-icons"
                        size="lg"
                        checkedIcon={
                          <Moon className="h-3 w-3 animate-in text-primary duration-300 fade-in zoom-in" />
                        }
                        uncheckedIcon={
                          <Sun className="h-3 w-3 animate-in text-amber-500 duration-300 fade-in zoom-in" />
                        }
                      />
                      <Label htmlFor="switch-icons">Icon Toggle Switch</Label>
                    </div>
                  </VariantGrid>
                </div>

                <div>
                  <SubLabel>States</SubLabel>
                  <VariantGrid>
                    <div className="flex items-center gap-2">
                      <Switch id="airplane-disabled" disabled />
                      <Label htmlFor="airplane-disabled">Disabled</Label>
                    </div>
                  </VariantGrid>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock id="forms-combobox" title="Combobox">
              <div className="max-w-xs">
                <Combobox
                  options={COMBOBOX_OPTIONS}
                  value={comboboxValue}
                  onChange={setComboboxValue}
                  placeholder="Select framework"
                />
              </div>
            </ComponentBlock>

            <ComponentBlock id="forms-input-group" title="Input Group">
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

            <ComponentBlock id="forms-input-otp" title="Input OTP">
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

            <ComponentBlock id="forms-password-input" title="Password Input">
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

            <ComponentBlock id="forms-input-error" title="Input Error">
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

            <ComponentBlock id="forms-form" title="Form">
              <FormShowcase />
            </ComponentBlock>
          </ShowcaseSection>

          <ShowcaseSection
            id="feedback"
            title={t('sections.feedback')}
            description={t('sections.feedbackDesc')}
          >
            <ComponentBlock id="feedback-alert" title="Alert">
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

            <ComponentBlock id="feedback-toast" title="Toast">
              <SubLabel>Types</SubLabel>
              <VariantGrid>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast('Default toast message')}
                >
                  Default
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.success('Changes saved successfully')}
                >
                  Success
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.info('New update available')}
                >
                  Info
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.warning('Your session is expiring soon')}
                >
                  Warning
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.error('Something went wrong')}
                >
                  Error
                </Button>
              </VariantGrid>
              <SubLabel>With description</SubLabel>
              <VariantGrid>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    toast('Event created', {
                      description: 'Monday, January 3rd at 6:00pm',
                    })
                  }
                >
                  With description
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    toast.success('Profile updated', {
                      description: 'Your changes have been saved.',
                      action: {
                        label: 'Undo',
                        onClick: () => toast.info('Undo clicked'),
                      },
                    })
                  }
                >
                  With action
                </Button>
              </VariantGrid>
              <SubLabel>Loading</SubLabel>
              <VariantGrid>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const id = toast.loading('Saving changes...');
                    setTimeout(() => {
                      toast.success('Saved!', { id });
                    }, 1500);
                  }}
                >
                  Loading → Success
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    toast.promise(
                      new Promise<string>((resolve) =>
                        setTimeout(() => resolve('Done'), 1500),
                      ),
                      {
                        loading: 'Processing...',
                        success: 'Completed successfully',
                        error: 'Failed to process',
                      },
                    )
                  }
                >
                  Promise
                </Button>
              </VariantGrid>
            </ComponentBlock>

            <ComponentBlock id="feedback-badge" title="Badge">
              <SubLabel>Variants</SubLabel>
              <VariantGrid>
                {BADGE_VARIANTS.map((variant) => (
                  <Badge key={variant} variant={variant}>
                    {variant}
                  </Badge>
                ))}
              </VariantGrid>
            </ComponentBlock>

            <ComponentBlock id="feedback-progress" title="Progress">
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

            <ComponentBlock id="feedback-spinner" title="Spinner">
              <Spinner className="size-6" />
            </ComponentBlock>

            <ComponentBlock id="feedback-skeleton" title="Skeleton">
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
            <ComponentBlock id="data-display-avatar" title="Avatar">
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

            <ComponentBlock
              id="data-display-card"
              title="Card"
              allowOverflow
              className="space-y-8"
            >
              <div>
                <SubLabel>Glass</SubLabel>
                <div className="grid gap-6 p-1 sm:grid-cols-2">
                  <Card hover className="max-w-sm">
                    <CardHeader>
                      <CardTitle>Card title</CardTitle>
                      <CardDescription>Card description text.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Premium glass card with hover lift.
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
                  <Card hover className="max-w-sm">
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
                        Glass card with a header action slot.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <SubLabel>Flat</SubLabel>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Card flat className="max-w-sm">
                    <CardHeader>
                      <CardTitle>Card title</CardTitle>
                      <CardDescription>Card description text.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Simple bordered card without shadow.
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
                  <Card flat className="max-w-sm">
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
                        Flat card with a header action slot.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ComponentBlock>

            <ComponentBlock id="data-display-table" title="Table">
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

            <ComponentBlock id="data-display-separator" title="Separator">
              <div className="space-y-2">
                <p className="text-sm">Above separator</p>
                <Separator />
                <p className="text-sm">Below separator</p>
              </div>
            </ComponentBlock>

            <ComponentBlock id="data-display-icon" title="Icon">
              <SubLabel>Lucide icons</SubLabel>
              <div className="flex items-center gap-4">
                <Icon iconNode={Heart} className="size-6 text-destructive" />
                <Icon iconNode={Star} className="size-6 text-warning" />
                <Icon iconNode={Settings} className="size-6 text-primary" />
              </div>
            </ComponentBlock>

            <ComponentBlock
              id="data-display-placeholder-pattern"
              title="Placeholder Pattern"
            >
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
            <ComponentBlock id="navigation-breadcrumb" title="Breadcrumb">
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

            <ComponentBlock id="navigation-tabs" title="Tabs">
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

            <ComponentBlock id="navigation-text-link" title="Text Link">
              <SubLabel>Variants</SubLabel>
              <div className="flex flex-wrap items-center gap-6">
                <TextLink href="/about">Default link</TextLink>
                <TextLink href="/about" variant="underlined">
                  Underlined link
                </TextLink>
                <TextLink href="/about" className="text-primary">
                  Primary link
                </TextLink>
              </div>
            </ComponentBlock>

            <ComponentBlock
              id="navigation-navigation-menu"
              title="Navigation Menu"
              allowOverflow
            >
              <div className="relative max-w-full overflow-x-clip">
                <NavigationMenu
                  viewport={false}
                  className="inline-flex max-w-full flex-none"
                >
                  <NavigationMenuList className="justify-start">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        Getting started
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-top-2 data-[motion=from-start]:slide-in-from-top-2 data-[motion=to-end]:slide-out-to-top-2 data-[motion=to-start]:slide-out-to-top-2">
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
              </div>
            </ComponentBlock>
          </ShowcaseSection>

          <ShowcaseSection
            id="overlays"
            title={t('sections.overlays')}
            description={t('sections.overlaysDesc')}
          >
            <ComponentBlock id="overlays-dialog" title="Dialog">
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

            <ComponentBlock id="overlays-sheet" title="Sheet">
              <div className="flex flex-wrap gap-2">
                {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
                  <Sheet key={side}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="capitalize">
                        {side}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side={side}>
                      <SheetHeader>
                        <SheetTitle>Sheet from {side}</SheetTitle>
                        <SheetDescription>
                          Slide-over panel anchored to the {side} edge.
                        </SheetDescription>
                      </SheetHeader>
                      <SheetBody>
                        <p className="text-sm text-muted-foreground">
                          Use sheets for filters, settings, or secondary flows
                          without leaving the current page. Body content scrolls
                          when it exceeds the viewport.
                        </p>
                        <div className="mt-4 space-y-2">
                          {Array.from({ length: 6 }, (_, index) => (
                            <div
                              key={index}
                              className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm"
                            >
                              Example row {index + 1}
                            </div>
                          ))}
                        </div>
                      </SheetBody>
                      <SheetFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save</Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            </ComponentBlock>

            <ComponentBlock id="overlays-popover" title="Popover">
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

            <ComponentBlock id="overlays-tooltip" title="Tooltip">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip content</TooltipContent>
              </Tooltip>
            </ComponentBlock>

            <ComponentBlock id="overlays-dropdown-menu" title="Dropdown Menu">
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
            <ComponentBlock id="layout-accordion" title="Accordion">
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

            <ComponentBlock id="layout-collapsible" title="Collapsible">
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

            <ComponentBlock id="layout-carousel" title="Carousel">
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

            <ComponentBlock id="layout-calendar" title="Calendar">
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
