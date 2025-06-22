import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { news, News } from '@/data/data'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    article: News
}

const Similaire = ({ article }: Props) => {
    const router = useRouter();
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Articles recommandés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.filter(x => x._id !== article._id && x.category === article.category).map((item, index) => (
                    <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div className="p-4">
                            <Badge variant="outline" className="mb-2">{item.category}</Badge>
                            <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                            <Button
                            onClick={() => router.push(`/actualites/${item._id}`)}
                             variant="link" className="p-0 h-auto !rounded-button whitespace-nowrap cursor-pointer">
                                Lire l'article <i className="fas fa-arrow-right ml-2"></i>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default Similaire
