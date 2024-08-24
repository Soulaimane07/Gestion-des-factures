import React from 'react'
import { fournisseurVars } from '../Variables'
import { GreenBadget, RedBadget } from '../Badges'

function FournisseurDetails({fournisseur}) {
  return (
        <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8'>
            {Object.entries({
                'Account ID': fournisseur?._id,
                'Nom Complet': fournisseur?.name,
                'Raison social': fournisseur?.raisonsocial,
                'IF': fournisseur?.if,
                'ICE': fournisseur?.ice,
                'Code tiers': fournisseur?.code,
                'Exoneration': fournisseur?.exoneration ? <GreenBadget text="Inclus" /> : <RedBadget text="Exclus" />,
                'Type activité': fournisseurVars?.activite[fournisseur?.activite]?.title,
                'Forme Juridique': fournisseurVars?.forme[fournisseur?.forme]?.title,
                'Application de la réglementation des marchés publics': fournisseur?.reglementation ? <GreenBadget text="Oui" /> : <RedBadget text="Non" />,
                'Présentation de l\'attestation de régularité fiscale depuis moins de 6 mois': fournisseur?.fiscale ? <GreenBadget text="Oui" /> : <RedBadget text="Non" />
            }).map(([label, value]) => (
                <div className='flex flex-col mb-6' key={label}>
                    <label className='mb-2 opacity-60'>{label}</label>
                    <p>{value}</p>
                </div>
            ))}
        </div>
  )
}

export default FournisseurDetails