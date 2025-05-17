import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { Tooltip } from 'react-tooltip'
import GeoPoland from '@/lib/geo-poland.json'

export const Map = () => {
  const [tooltipContent, setTooltipContent] = useState('')

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        style={{ userSelect: 'none' }}
        projectionConfig={{
          center: [19.1451, 52.237], // approximate center of Poland (longitude, latitude)
          scale: 3500, // Adjust this number to zoom in/out
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
                data-tooltip-id="tooltip" // Link to the Tooltip
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
        <Marker coordinates={[21.0122, 52.2297]}>
          <circle r={5} fill="#F00" />
        </Marker>
      </ComposableMap>
      <Tooltip
        id="tooltip" // Tooltip ID that links with Geography via data-tooltip-id
        place="top" // You can use 'top', 'bottom', 'left', or 'right'
      >
        {tooltipContent}
      </Tooltip>
    </>
  )
}
