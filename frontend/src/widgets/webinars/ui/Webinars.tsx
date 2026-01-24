import { Title, Table, Checkbox, Button, TextInput, Group, Container, Anchor, Badge } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useState, useMemo } from 'react'

export type WebinarDTO = {
  id: number
  title: string
  date: string
  registrationLink: string
  recordingLink: string
  isFeatured: boolean
  isPublished: boolean
}

type TProps = {
  webinars: WebinarDTO[]
}

export const Webinars: React.FC<TProps> = (props): JSX.Element => {
  const { webinars: initialWebinars } = props
  const { t } = useTranslation()
  
  const [searchQuery, setSearchQuery] = useState('')
  
  // Фильтрация вебинаров на клиенте
  const filteredWebinars = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialWebinars
    }
    
    const query = searchQuery.toLowerCase()
    return initialWebinars.filter(webinar =>
      webinar.title.toLowerCase().includes(query) ||
      webinar.date.toLowerCase().includes(query) ||
      webinar.registrationLink?.toLowerCase().includes(query) ||
      webinar.recordingLink?.toLowerCase().includes(query)
    )
  }, [initialWebinars, searchQuery])
  
  const handleCreateClick = () => {
     alert(t('adminPage.webinars.alertCreate'))
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  if (!initialWebinars || initialWebinars.length === 0) {
    return (
      <Container size='xl' py='md'>
        <Title order={2} mb='md' fw={500}>
          {t('adminPage.webinars.title')}
        </Title>
        
        {/* Без формы, только поиск и кнопка создания */}
        <Group gap='xs' mb='md'>
          <TextInput
            placeholder={t('adminPage.webinars.input')}
            value={searchQuery}
            w={240}
            onChange={handleSearchChange}
          />
          <Button 
            variant='default'
            onClick={handleCreateClick}
          >
            {t('adminPage.webinars.button')}
          </Button>
        </Group>
        
        <div style={{ textAlign: 'center', padding: '40px', color: 'gray' }}>
          {t('adminPage.webinars.noWebinars')}
        </div>
      </Container>
    )
  }

  return (
    <Container size='xl' py='md'>
      <Title order={2} mb='md' fw={500}>
        {t('adminPage.webinars.title')}
      </Title>
      
      {/* Без формы, только поиск и кнопка создания */}
      <Group gap='xs' mb='md'>
        <TextInput
          placeholder={t('adminPage.webinars.input')}
          value={searchQuery}
          w={240}
          onChange={handleSearchChange}
        />
        <Button 
          variant='default'
          onClick={handleCreateClick}
        >
          {t('adminPage.webinars.button')}
        </Button>
      </Group>
      
      <Table withTableBorder verticalSpacing='md'>
        <Table.Thead bg='gray.1'>
          <Table.Tr>
            <Table.Th fz='md' py='xs' w='30%'>
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
            <Table.Th fz='md' py='xs' w={100} ta='center'>
              {t('adminPage.webinars.webinarFeatured')}
            </Table.Th>
            <Table.Th fz='md' py='xs' w={100} ta='center'>
              {t('adminPage.webinars.webinarPublished')}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        
        <Table.Tbody>
          {filteredWebinars.map((webinar) => (
            <Table.Tr key={webinar.id}>
              {/* Название */}
              <Table.Td>
                <Anchor href='' underline='not-hover'>
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
                    {t('adminPage.webinars.registration')}
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
                    {t('adminPage.webinars.recording')}
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
      
      {/* Сообщение если ничего не найдено */}
      {searchQuery && filteredWebinars.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
          {t('adminPage.webinars.noResults', { query: searchQuery })}
        </div>
      )}
    </Container>
  ) 
}
