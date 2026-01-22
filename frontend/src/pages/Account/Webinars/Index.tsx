import type { InertiaPage } from '@shared/types/inertia'
import { AppLayout } from '../components/AppLayout'
import { Webinars } from '@widgets/webinars'

type WebinarsEntry = {
  id: number
  title: string
  date: string
  registrationLink: string
  recordingLink: string
  isFeatured: boolean
  isPublished: boolean
}

type TProps = {
  webinars: WebinarsEntry[]
}

const WebinarsPage: InertiaPage<TProps> = ({ webinars }) => {
  return <Webinars webinars={webinars} />
}

WebinarsPage.layout = page => (
  <AppLayout>
    {page}
  </AppLayout>
)

export default WebinarsPage
