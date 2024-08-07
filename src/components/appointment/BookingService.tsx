import React from 'react';
import { Avatar, Select, SelectItem } from '@nextui-org/react';
import { ServiceGet } from '@/Models/Service';
interface BookingServiceProps {
  services: ServiceGet[];
  onSelectService: (serviceId: string) => void;
}

const BookingService: React.FC<BookingServiceProps> = ({ services, onSelectService }) => {
  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceIdFromEvent = event.target.value;
    onSelectService(selectedServiceIdFromEvent);
  };
  return (
    <Select
      items={services}
      label='Choose your service'
      className='max-w-md'
      variant='bordered'
      classNames={{
        label: 'group-data-[filled=true]:-translate-y-5',
        trigger: 'min-h-16',
        listboxWrapper: 'max-h-[400px]'
      }}
      listboxProps={{
        itemClasses: {
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500'
          ]
        }
      }}
      popoverProps={{
        classNames: {
          base: 'before:bg-default-200',
          content: 'p-0 border-small border-divider'
        }
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className='flex items-center gap-2'>
            <Avatar alt={item.data?.name} className='flex-shrink-0' size='sm' />
            <div className='flex flex-col'>
              <span>{item.data?.name}</span>
              <span className='text-default-500 text-tiny'>({item.data?.description})</span>
            </div>
          </div>
        ));
      }}
      onChange={handleServiceChange}
    >
      {(service) => (
        <SelectItem key={service.serviceId} value={service.serviceId} textValue={service.name}>
          <div className='flex gap-2 items-center'>
            <Avatar alt={service.name} className='flex-shrink-0' size='sm' />
            <div className='flex flex-col'>
              <span className='text-small'>{service.name}</span>
              <span className='text-tiny text-default-400'>{service.description}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
export default BookingService;
