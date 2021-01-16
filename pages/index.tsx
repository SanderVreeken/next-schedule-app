import Head from 'next/head'

import { getAvailableShifts, scheduleShifts } from '../functions/schedule'
import employees from '../mockdata/employees'
import shifts from '../mockdata/shifts'

import styles from '../styles/Home.module.css'

export default function Home() {
  console.log(scheduleShifts(getAvailableShifts(1614556800000, shifts, 1612137600000), employees))

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
