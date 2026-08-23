import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface LoanOption {
  title: string;
  description: string;
  icon: string;
  rate?: string;
  discount?: boolean;
}

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private readonly router: Router) {}

  /* ============================================================
     IMAGE PATHS
     ============================================================ */

  readonly images = {
    // Main hero image
    hero:
      'assets/images/LC_Hero_Image_lg.jpg_w_3840_q_75_1771652329889-DO6BEfn8.jpeg',

    // Auto refinance / family image
    autoRefinance:
      'assets/images/asset-7.jpeg',

    // Phone screenshots
    loanPhone:
      'assets/images/image%20(1).png',

    mobileApp:
      'assets/images/image%20(2).png',

    // Testimonial woman
    testimonialPerson:
      'assets/images/imagelady.png',

    // LendingClub logo
    lendingClubLogo:
      'assets/images/asset-25.svg',

    // LC logo
    lcLogo:
      'assets/images/asset-22.png',

    // App store badges
    appStore:
      'assets/images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',

    googlePlay:
      'assets/images/Google_Play_Store_badge_EN__5_.svg',

    // Footer badges
    equalHousing:
      'assets/images/asset-26.svg',

    bbb:
      'assets/images/asset-27.svg',

    verisign:
      'assets/images/asset-28.svg'
  };


  /* ============================================================
     LOAN OPTIONS
     ============================================================ */

  loanOptions: LoanOption[] = [
    {
      title: 'Debt Paydown Loan',

      description:
        'A debt consolidation loan up to $60,000 to pay off credit card debt or personal loan balances, with the option to get extra cash.',

      icon:
        'assets/images/image.svg',

      rate:
        'Rates starting at 6.53% APR',

      discount:
        true
    },

    {
      title: 'Cash Loan',

      description:
        'A personal loan up to $60,000 to cover expenses like a major purchase, home improvements, life events, etc.',

      icon:
        'assets/images/image%20(1).svg'
    },

    {
      title: 'Pay for a Large Expense',

      description:
        'Get up to $65,000 to cover medical treatments, wellness services, tutoring, large retail purchases, and more.',

      icon:
        'assets/images/image%20(2).svg'
    },

    {
      title: 'Auto Loan Refinance',

      description:
        'Flexible terms and competitive rates could help you pay less than you do right now.',

      icon:
        'assets/images/image%20(3).svg'
    }
  ];


  /* ============================================================
     FAQ
     ============================================================ */

  faqs: FaqItem[] = [
    {
      question:
        'How is LendingClub different?',

      answer:
        'LendingClub provides financial products designed to help members reach their financial goals with flexible loan and banking options.',

      open:
        false
    },

    {
      question:
        'What is a personal loan?',

      answer:
        'A personal loan is an installment loan that can be used for a variety of personal expenses. You typically receive a fixed amount and repay it over an agreed period.',

      open:
        false
    },

    {
      question:
        'How is a personal loan different than a credit card?',

      answer:
        'Personal loans generally provide a fixed amount with a fixed repayment schedule, while credit cards provide revolving credit that can be borrowed and repaid repeatedly.',

      open:
        false
    },

    {
      question:
        'Will checking my rate hurt my credit score?',

      answer:
        'Checking your potential rate generally involves a soft credit inquiry, which does not impact your credit score. A hard inquiry may occur later depending on the application.',

      open:
        false
    },

    {
      question:
        'How can I protect myself from scams?',

      answer:
        'Never share sensitive account credentials through unsolicited messages. Verify that communications come from an official source before providing personal or financial information.',

      open:
        false
    }
  ];


  /* ============================================================
     NAVIGATION
     ============================================================ */

  scrollToSection(sectionId: string): void {

    const element =
      document.getElementById(sectionId);

    if (element) {

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }
  }


  /* ============================================================
     ACTIONS
     ============================================================ */

  startVerification(): void {
    this.router.navigate(['/verify']);
  }


  checkRate(loan: LoanOption): void {

    console.log(
      'Checking rate:',
      loan.title
    );

    // Later:
    // this.router.navigate(['/apply-loan'], {
    //   queryParams: {
    //     loanType: loan.title
    //   }
    // });

  }


  learnMore(section: string): void {

    console.log(
      'Learn more:',
      section
    );

  }


  applyForLoan(): void {

    console.log(
      'Apply for personal loan'
    );

  }


  toggleFaq(index: number): void {

    this.faqs[index].open =
      !this.faqs[index].open;

  }


  visitHelpCenter(): void {

    console.log(
      'Help Center clicked'
    );

  }

}