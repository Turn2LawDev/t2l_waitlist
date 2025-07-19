import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="28"
          height="32"
          viewBox="0 0 47 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.1577 0L23.3154 13.2169L27.3883 17.4196L32.3325 11.9016V43.256L5.13397 14.3514C3.23134 12.3294 0 13.7758 0 16.6493V64H5.65034V23.4339L32.8489 52.3385C34.7514 54.3604 37.9828 52.9143 37.9828 50.0406V11.9016L42.927 17.4196L47 13.2169L35.1577 0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
