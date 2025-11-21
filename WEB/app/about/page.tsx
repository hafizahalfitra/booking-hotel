import { Metadata } from "next"
import HeaderSection from "@/components/header-setion"
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5"
import Image from "next/image"

export const metadata: Metadata = {
    title: "Tentang Kami | Hotel Bandar Lampung",
    description: "Online Booking Hotel Bandar Lampung",
}
const AboutPage = () => {
    return (
        <div>
            <HeaderSection title="Tentang Kami" subtitle="Lorem ipsum dolor, sit amet consectetur ." />
            <div className="max-w-screen-xl mx-auto py-20 px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <Image src="/about-image.jpg" width={650} height={579} alt="about image" />
                    <div>
                        <h1 className="text-5xl font-semibold text-gray-900 mb-4">Siapa Kami</h1>
                        <p className="text-gray-700 py-5">Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Et possimus tenetur omnisobcaecati,
                            voluptates iste aperiam culpa mollitia dolore quo.</p>
                        <ul className="list-item space-y-6 pt-8">
                            <li className="flex gap-5">
                                <div className="flex-none mt-1">
                                    <IoEyeOutline className="size-7" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">Visi : </h4>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Aliquam omnis itaque aliquid odio quis accusamus?</p>
                                </div>
                            </li>
                            <li className="flex gap-5">
                                <div className="flex-none mt-1">
                                    <IoLocateOutline className="size-7" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">Misi : </h4>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quas a suscipit dolore autem accusamus consequuntur quos earum beatae rem?</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage