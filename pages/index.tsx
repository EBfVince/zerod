import { BobPage } from '../utils/layout-types-next'
import { IndexHeader } from '../components/index/IndexHeader'
import { SectionMarket } from '../components/section/SectionMarket'
import { SectionPref } from '../components/section/SectionPref'
import { SectionEta } from '../components/section/SectionEta'

interface IndexProps {}

const IndexPage: BobPage<IndexProps> = () => (
  <>
    <IndexHeader />
    <div className="my-8 lg:w-lg mx-auto">
      <SectionMarket />
      <SectionPref className="mt-16" />
      <SectionEta className="mt-16 mx-6" />
    </div>
  </>
)

export default IndexPage
