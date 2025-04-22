declare namespace CodeceptJS {
  interface SupportObject { 
      I: I; 
      current: any; 
      loginPage: LoginPage; // исправьте на ваше фактическое имя класса
      config: Config; // исправьте на ваше фактическое имя класса
  }
  
  interface Methods extends Playwright {
      amOnPage(url: string): void; // Добавьте метод
      see(text: string): void;      // Пример других методов
      // Добавьте другие методы по необходимости
  }
  
  interface I extends ReturnType<steps_file> {}
  
  namespace Translation {
      interface Actions {}
  }
}