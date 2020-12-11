import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { useStores } from '../models'
import { observer } from 'mobx-react-lite'

interface Props {
  launch: {
    mission: string
    site: string
    timestamp: number
    rocket: string
  }
}

const IndexPage: NextPage<Props> = observer(({ launch }) => {
  const date = new Date(launch.timestamp)
  const { userStore } = useStores()
  const user = userStore.user

  const onClick = (): void => {
    userStore.setUser({
      name: 'VinceBg',
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={`${styles.title} pb-6`}>
          Welcome to <a href="https://nextjs.org">Zerod</a> 🎉
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <h1>Next SpaceX Launch: {launch.mission}</h1>
        <p>
          {launch.rocket} will take off from {launch.site} on {date.toDateString()}
        </p>

        <div>User : {user?.name}</div>
        <div className={styles.grid}>
          <button className="bg-primary" onClick={onClick}>
            Je suis un bouton primaire
          </button>
          <Link href="/test">Vers test</Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
})

export default IndexPage

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches/next')
  const nextLaunch = await response.json()
  return {
    props: {
      launch: {
        mission: nextLaunch.mission_name,
        site: nextLaunch.launch_site.site_name_long,
        timestamp: nextLaunch.launch_date_unix * 1000,
        rocket: nextLaunch.rocket.rocket_name,
      },
    },
  }
}
