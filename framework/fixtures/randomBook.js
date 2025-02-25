import { faker } from "@faker-js/faker";

export async function generateBook() {
    return {
        isbn: faker.number.int(),
        title: faker.book.title(),
        subTitle: faker.book.title(),
        author: faker.book.author(),
        publish_date: faker.date.anytime(),
        publisher: faker.book.publisher(),
        pages: faker.number.int(),
        description: faker.book.series(),
        website: faker.internet.url()
    }
}