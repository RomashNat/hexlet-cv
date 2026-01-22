import { Title, Table, Checkbox, Button, TextInput, Group, Container, Anchor, Badge } from '@mantine/core'
import { useForm } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

type WebinarsEntry = {
    id: number
    title: string
    date: string // формат: "2024-03-15 14:30"
    registrationLink: string
    recordingLink: string
    isFeatured: boolean
    isPublished: boolean
}

type TProps = {
    webinars: WebinarsEntry[]
}

export const Webinars: React.FC<TProps> = (props): JSX.Element => {
    const { webinars } = props
    const { t } = useTranslation()

    const form = useForm({ search: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.data.search.trim()) {
            return
        }
        // form.post('/ru/admin/webinars')
        form.setData('search', '')
    }

    return (
        <Container size='xl' py='md' bg='white'>
            <Title order={2} mb='md' fw={500} c='black'>
                {t('adminPage.webinars.title')}
            </Title>
            
            <form onSubmit={handleSubmit}>
                <Group gap='xs' mb='md'>
                    <TextInput
                        placeholder={t('adminPage.webinars.input')}
                        value={form.data.search}
                        w={240}
                        onChange={e => form.setData('search', e.target.value)}
                    />
                    <Button type='submit' variant='default'>
                        {t('adminPage.webinars.button')}
                    </Button>
                </Group>
            </form>
            
            <Table withTableBorder verticalSpacing='md'>
                <Table.Thead bg='gray.1'>
                    <Table.Tr>
                        <Table.Th fz='md' py='xs' w='25%'>
                            {t('adminPage.webinars.webinarTitle')}
                        </Table.Th>
                        <Table.Th fz='md' py='xs' w='15%'>
                            {t('adminPage.webinars.webinarDate')}
                        </Table.Th>
                        <Table.Th fz='md' py='xs' w='15%'>
                            {t('adminPage.webinars.webinarRegistration')}
                        </Table.Th>
                        <Table.Th fz='md' py='xs' w='15%'>
                            {t('adminPage.webinars.webinarRecording')}
                        </Table.Th>
                        <Table.Th fz='md' py='xs' w='15%' ta='center'>
                            {t('adminPage.webinars.webinarFeatured')}
                        </Table.Th>
                        <Table.Th fz='md' py='xs' w='15%' ta='center'>
                            {t('adminPage.webinars.webinarPublished')}
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                
                <Table.Tbody>
                    {webinars?.map((webinar) => (
                        <Table.Tr key={webinar.id}>
                            {/* Название */}
                            <Table.Td>
                                <Anchor href='' c='black' underline='not-hover'>
                                    {webinar.title}
                                </Anchor>
                            </Table.Td>
                            
                            {/* Дата */}
                            <Table.Td>
                                {webinar.date}
                            </Table.Td>
                            
                            {/* Регистрация */}
                            <Table.Td>
                                {webinar.registrationLink ? (
                                    <Badge 
                                        component='a'
                                        href={webinar.registrationLink}
                                        target='_blank'
                                        variant='outline'
                                        color='blue'
                                        size='sm'
                                    >
                                        Регистрация
                                    </Badge>
                                ) : (
                                    '—'
                                )}
                            </Table.Td>
                            
                            {/* Запись */}
                            <Table.Td>
                                {webinar.recordingLink ? (
                                    <Badge 
                                        component='a'
                                        href={webinar.recordingLink}
                                        target='_blank'
                                        variant='outline'
                                        color='green'
                                        size='sm'
                                    >
                                        Запись
                                    </Badge>
                                ) : (
                                    '—'
                                )}
                            </Table.Td>
                            
                            {/* Избранное */}
                            <Table.Td ta='center'>
                                <Checkbox 
                                    checked={webinar.isFeatured} 
                                    style={{ display: 'inline-block' }} 
                                    size='xs' 
                                    readOnly
                                />
                            </Table.Td>
                            
                            {/* Публикация */}
                            <Table.Td ta='center'>
                                <Checkbox 
                                    checked={webinar.isPublished} 
                                    style={{ display: 'inline-block' }} 
                                    size='xs' 
                                    readOnly
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Container>
    ) 
}
