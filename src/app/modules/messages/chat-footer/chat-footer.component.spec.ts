import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChatFooterComponent } from "./chat-footer.component";

describe("ChatFooterComponent", () => {
  let component: ChatFooterComponent;
  let fixture: ComponentFixture<ChatFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
