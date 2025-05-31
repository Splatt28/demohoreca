import { useEffect, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { Tooltip } from 'react-tooltip'
import GeoPoland from '@/lib/geo-poland.json'
import servicesList from '@/assets/data/services.json'

// Example voivodeship data with coordinates and a number
const voivodeshipsInit = [
  { name: 'Dolnośląskie', coordinates: [16.33, 51.1079], number: 1 },
  { name: 'Kujawsko-Pomorskie', coordinates: [18.6, 53.0138], number: 2 },
  { name: 'Lubelskie', coordinates: [22.5667, 51.25], number: 3 },
  { name: 'Lubuskie', coordinates: [15.2, 52.2333], number: 4 },
  { name: 'Łódzkie', coordinates: [19.4667, 51.7667], number: 5 },
  { name: 'Małopolskie', coordinates: [20.0199, 49.8951], number: 6 },
  { name: 'Mazowieckie', coordinates: [21.0122, 52.2297], number: 7 },
  { name: 'Opolskie', coordinates: [17.9333, 50.6667], number: 8 },
  { name: 'Podkarpackie', coordinates: [22.0, 50.0167], number: 9 },
  { name: 'Podlaskie', coordinates: [23.1667, 53.1333], number: 10 },
  { name: 'Pomorskie', coordinates: [18.1383, 54.152], number: 11 },
  { name: 'Śląskie', coordinates: [18.93, 50.2945], number: 12 },
  { name: 'Świętokrzyskie', coordinates: [20.6333, 50.8667], number: 13 },
  { name: 'Warmińsko-Mazurskie', coordinates: [20.5, 53.7667], number: 14 },
  { name: 'Wielkopolskie', coordinates: [16.9252, 52.4064], number: 15 },
  { name: 'Zachodniopomorskie', coordinates: [15.553, 53.5285], number: 16 },
]

export const Map = () => {
  const [tooltipContent, setTooltipContent] = useState('')
  const [voivodeships, setVoivodeships] = useState(voivodeshipsInit)

  useEffect(() => {
    setVoivodeships((prevVoivodeships) => {
      const counts = servicesList.reduce(
        (acc, product) => {
          product.attributes.wojewodztwa.forEach((v) => {
            acc[v] = (acc[v] || 0) + 1
          })
          return acc
        },
        {} as Record<string, number>,
      )
      return prevVoivodeships.map((voivodeship) => ({
        ...voivodeship,
        number: counts[voivodeship.name.toLocaleLowerCase()] || 0,
      }))
    })
  }, [])

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        style={{ userSelect: 'none' }}
        projectionConfig={{
          center: [19.1451, 52.237],
          scale: 3500,
        }}
        width={800}
        height={600}
      >
        <Geographies geography={GeoPoland}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                data-tooltip-id="tooltip"
                onMouseEnter={() => {
                  const { name } = geo.properties
                  setTooltipContent(`${name}`)
                }}
                onMouseLeave={() => setTooltipContent('')}
                style={{
                  default: {
                    fill: '#D6D6DA',
                    outline: 'none',
                    stroke: '#000',
                    strokeWidth: '0.1',
                  },
                  hover: { fill: '#5d4037', outline: 'none' },
                  pressed: {
                    fill: '#5d4037',
                    outline: 'none',
                    pointerEvents: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>

        {voivodeships.map((voivode, index) => (
          <Marker
            key={index}
            coordinates={voivode.coordinates as [number, number]}
          >
            <circle r={16} fill="#f44336" stroke="#fff" strokeWidth={1.5} />
            <text
              textAnchor="middle"
              y={5}
              fontSize={14}
              fill="#fff"
              fontWeight="bold"
            >
              {voivode.number}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      <Tooltip id="tooltip" place="top">
        {tooltipContent}
      </Tooltip>
    </>
  )
}
