import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/customer_components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/customer_components/theme-switch'
import { TopNav } from '@/components/customer_components/top-nav'
import { UserNav } from '@/components/customer_components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { useAuth } from '@/Context/useAuth'
import IncomingAppointments from './components/incoming-appointments'
import { useEffect, useState } from 'react'
import { AppointmentGet } from '@/Models/Appointment'
import { appointmentCustomerAPI } from '@/Services/AppointmentService'
import { toast } from 'sonner'
import PetHealthStatus from './components/pet-health-status'
import { getAllPetHealthTracks } from '@/Services/PetHealthTrackService'
import { PetHealthTrack } from '@/Models/PetHealthTrack'

export default function Dashboard() {
  const {user} = useAuth();
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const [petHealthTracks, setPetHealthTracks] = useState<PetHealthTrack[]>([]);
  
  const getAppointments = async () => {
    await appointmentCustomerAPI(String(user?.userName))
    .then((res) => {
      if (res?.data) {
        setAppointments(res.data);
      }
    })
    .catch((e) => {
      toast.error("Server error occurred", e);
    })
  };

  const getPetHealthTracks = async () => {
    await getAllPetHealthTracks()
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        
        setPetHealthTracks(res.data);
      }
    })
    .catch((e) => {
      toast.error("Server error occurred", e);
    })
  };

  useEffect(() => {
    getAppointments();
    getPetHealthTracks();
  }, []);

  console.log(appointments);
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Welcome, {user?.userName}
          </h1>
        
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-scroll pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Revenue
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$45,231.89</div>
                  <p className='text-xs text-muted-foreground'>
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Subscriptions
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+2350</div>
                  <p className='text-xs text-muted-foreground'>
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+12,234</div>
                  <p className='text-xs text-muted-foreground'>
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Now
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4 overflow-y-auto'>
                <CardHeader>
                  <CardTitle>Track Your Pet's Health Status</CardTitle>
                  <CardDescription>
                    This information is updated everyday, keep track of the latest status here.
                  </CardDescription>
                </CardHeader>
                <CardContent className='pl-2'>
                  <PetHealthStatus petHealthTracks={petHealthTracks}/>
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3 min-h-[58vh]'>
                <CardHeader>
                  <CardTitle>Incoming Appointments</CardTitle>
                  <CardDescription>
                    This is your appointments for today.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <IncomingAppointments appointments={appointments} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: '',
    isActive: true,
  },
  {
    title: 'Customers',
    href: '',
    isActive: false,
  },
  {
    title: 'Products',
    href: '',
    isActive: false,
  },
  {
    title: 'Settings',
    href: '',
    isActive: false,
  },
]
