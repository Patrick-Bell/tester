export const shipping = {
    ENVELOPE: [
    // padded envelope for few figures up to 4
      {
        icon: '',
        method: "Royal Mail | 2nd Class | Large Letter | UK Standard",
        weight: 'up to 100g',
        days: "For orders up to 100g, takes 2-3 working days.",
        price: 1.55
      },
      {
        icon: '',
        method: "Royal Mail | 2nd Class | Large Letter | Tracked 48",
        weight: 'up to 100g',
        days: "For orders up to 100g, takes 2-3 working days & includes tracking.",
        price: 2.70
      },
      {
        icon: '',
        method: "Royal Mail | 1st Class | Large Letter | Tracked 24",
        weight: 'up to 100g',
        days: "For orders up to 100g, takes 1-2 working days & includes full tracking.",
        price: 3.50
      },
    ],
    PARCEL: [
        // small parcel
        {
            icon: '',
            method: "Royal Mail | 2nd Class | Small Parcel | UK Standard",
            weight: 'up to 2kg',
            days: "For orders over 100g, takes 2-3 working days.",
            price: 3.25
          },
          {
            icon: '',
            method: "Royal Mail | 2nd Class | Small Parcel | Tracked 48",
            weight: 'up to 2kg',
            days: "For orders over 100g, takes 2-3 working days & includes tracking.",
            price: 3.39
          },
          {
            icon: '',
            method: "Royal Mail | 1st Class | Small Parcel | Tracked 24",
            weight: 'up to 2kg',
            days: "For orders over 100g, takes 1-2 working days & includes full tracking.",
            price: 4.25
          },
    ]
      // small parcels for more than 4 figures
  };