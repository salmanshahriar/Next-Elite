'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Chart, type ChartDataItem } from '@/components/ui/chart';
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { StatCard } from '@/components/ui/stat-card';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const CHART_DEMO_DATA: ChartDataItem[] = [
  { label: 'Jan', value: 1200 },
  { label: 'Feb', value: 1850 },
  { label: 'Mar', value: 1600 },
  { label: 'Apr', value: 2300 },
  { label: 'May', value: 2100 },
  { label: 'Jun', value: 2900 },
];

type DemoUser = {
  name: string;
  email: string;
  plan: string;
  active: boolean;
};

const DEMO_USERS: DemoUser[] = [
  { name: 'Ava Thompson', email: 'ava@example.com', plan: 'Pro', active: true },
  {
    name: 'Liam Carter',
    email: 'liam@example.com',
    plan: 'Free',
    active: false,
  },
  { name: 'Noah Patel', email: 'noah@example.com', plan: 'Team', active: true },
  { name: 'Mia Rossi', email: 'mia@example.com', plan: 'Pro', active: true },
  { name: 'Ethan Kim', email: 'ethan@example.com', plan: 'Free', active: true },
  { name: 'Zara Ali', email: 'zara@example.com', plan: 'Team', active: false },
  { name: 'Leo Martin', email: 'leo@example.com', plan: 'Pro', active: true },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('');

export const DEMO_USER_COLUMNS: DataTableColumnDef<DemoUser>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableSorting: false },
  { accessorKey: 'plan', header: 'Plan' },
  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-2">
        <StatusIndicator
          size="sm"
          variant={row.original.active ? 'success' : 'muted'}
        />
        {row.original.active ? 'Active' : 'Inactive'}
      </span>
    ),
  },
];

const DATA_TABLE_PAGE_SIZE = 5;

export const DataTableShowcase = () => {
  const [page, setPage] = useState(1);
  const start = (page - 1) * DATA_TABLE_PAGE_SIZE;

  return (
    <DataTable
      data={DEMO_USERS.slice(start, start + DATA_TABLE_PAGE_SIZE)}
      columns={DEMO_USER_COLUMNS}
      pagination={{
        total: DEMO_USERS.length,
        page,
        limit: DATA_TABLE_PAGE_SIZE,
        onPageChange: setPage,
      }}
    />
  );
};

export const ShowcaseDashboard = () => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold">Overview</p>
        <p className="text-sm text-muted-foreground">
          Last 6 months across all workspaces
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard title="Revenue" value="$12,950" />
        <StatCard title="Active users" value="1,240" />
        <StatCard title="Conversion" value="4.6%" />
        <StatCard
          title="System status"
          value="Online"
          icon={<StatusIndicator variant="success" size="lg" pulse />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card flat className="min-w-0 xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly recurring revenue</CardDescription>
            <CardAction>
              <Badge variant="success">+18.2%</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Chart
              data={CHART_DEMO_DATA}
              name="Revenue"
              formatValue={(value) => `$${value}`}
            />
          </CardContent>
        </Card>

        <Card flat className="min-w-0">
          <CardHeader>
            <CardTitle>Recent sign-ups</CardTitle>
            <CardDescription>New members this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {DEMO_USERS.slice(0, 5).map((user) => (
              <div key={user.email} className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <Badge variant="outline">{user.plan}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const ShowcaseProfile = () => {
  const [birthday, setBirthday] = useState<Date | undefined>(
    new Date(1995, 4, 14),
  );

  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold">Profile</p>
        <p className="text-sm text-muted-foreground">
          Manage your personal details and preferences
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card flat>
          <CardHeader>
            <CardTitle>Personal info</CardTitle>
            <CardDescription>
              How others see you on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Change photo
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="showcase-name">Name</Label>
                <Input id="showcase-name" defaultValue="Ava Thompson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="showcase-email">Email</Label>
                <Input
                  id="showcase-email"
                  type="email"
                  defaultValue="ava@example.com"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="showcase-birthday">Birthday</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="showcase-birthday"
                      variant="outline"
                      className="w-full justify-start font-normal"
                    >
                      <CalendarIcon className="text-muted-foreground" />
                      {birthday ? (
                        formatDate(birthday)
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={birthday}
                      onSelect={setBirthday}
                      defaultMonth={birthday}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="showcase-location">Location</Label>
                <Input id="showcase-location" defaultValue="London, UK" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="showcase-bio">Bio</Label>
              <Textarea
                id="showcase-bio"
                placeholder="Tell us a little about yourself"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button onClick={() => toast.success('Profile saved')}>
              Save changes
            </Button>
          </CardFooter>
        </Card>

        <Card flat>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Plan, notifications, and storage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Plan</Label>
              <Select defaultValue="pro">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-4">
              {[
                {
                  id: 'showcase-email-updates',
                  label: 'Product updates',
                  on: true,
                },
                { id: 'showcase-security', label: 'Security alerts', on: true },
                {
                  id: 'showcase-marketing',
                  label: 'Marketing emails',
                  on: false,
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <Label htmlFor={item.id} className="font-normal">
                    {item.label}
                  </Label>
                  <Switch id={item.id} defaultChecked={item.on} />
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage</span>
                <span className="text-muted-foreground">7.2 GB of 10 GB</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CUSTOMER_ACTIVITY = [
  {
    text: 'Noah Patel upgraded to Team',
    time: '2 min ago',
    variant: 'success',
  },
  { text: 'Mia Rossi renewed Pro', time: '1 hour ago', variant: 'success' },
  {
    text: 'Liam Carter payment failed',
    time: '3 hours ago',
    variant: 'destructive',
  },
  { text: 'Zara Ali trial ends soon', time: 'Yesterday', variant: 'warning' },
] as const;

const PLAN_BREAKDOWN = (['Pro', 'Team', 'Free'] as const).map((plan) => ({
  plan,
  count: DEMO_USERS.filter((user) => user.plan === plan).length,
}));

export const ShowcaseData = () => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold">Customers</p>
        <p className="text-sm text-muted-foreground">
          Everyone who signed up in the last 6 months
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card flat className="gap-4">
          <CardHeader>
            <CardTitle>Plans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PLAN_BREAKDOWN.map(({ plan, count }) => (
              <div key={plan} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{plan}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {count}
                  </span>
                </div>
                <Progress
                  value={(count / DEMO_USERS.length) * 100}
                  variant="success"
                  className="h-1.5"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card flat className="gap-4">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {CUSTOMER_ACTIVITY.map((event) => (
              <div key={event.text} className="flex items-center gap-3">
                <StatusIndicator size="sm" variant={event.variant} />
                <p className="min-w-0 flex-1 truncate text-sm">{event.text}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {event.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card flat className="min-w-0">
        <CardHeader>
          <CardTitle>All customers</CardTitle>
          <CardDescription>Sortable, paginated data table</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTableShowcase />
        </CardContent>
      </Card>
    </div>
  );
};
