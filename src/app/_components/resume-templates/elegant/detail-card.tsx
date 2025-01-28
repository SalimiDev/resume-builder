import { AlternateEmail, Link, LocationOn, Phone } from '@mui/icons-material';

import { DetailsFormType } from '../../forms/details/details-form-schema';

export default function DetailCard(data: DetailsFormType) {
    const { name, lastName, phoneNumber, location, role, email, extraFields } = data;

    return (
        <div className='flex flex-col gap-2'>
            <div>
                <div className='flex gap-2 text-3xl font-bold uppercase'>
                    <h1 className=''>{name}</h1>
                    <h1>{lastName}</h1>
                </div>
                <h3 className='text-lg capitalize text-primary-content'>{role}</h3>
            </div>

            <div className='flex w-4/5 flex-wrap gap-x-5 gap-y-1 text-sm *:flex *:items-center *:gap-1'>
                {phoneNumber && (
                    <div>
                        <Phone fontSize='small' className='text-base-25' />
                        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                    </div>
                )}

                {email && (
                    <div>
                        <AlternateEmail fontSize='small' className='text-base-25' />
                        <a href={`mailto:${email}`}>{email}</a>
                    </div>
                )}
                {location && (
                    <div>
                        <LocationOn fontSize='small' className='text-base-25' />
                        <p>{location}</p>
                    </div>
                )}

                {extraFields?.map(({ id, isLink, icon, value }) => (
                    <div key={id}>
                        {icon ? (
                            <img src={icon} alt='icon' className='size-5' />
                        ) : (
                            isLink && <Link fontSize='small' className='text-base-25' />
                        )}

                        {isLink ? <a href={value}>{value}</a> : <p>{value}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
