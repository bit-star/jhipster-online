/**
 * Copyright 2017-2018 the original author or authors from the JHipster Online project.
 *
 * This file is part of the JHipster Online project, see https://github.com/jhipster/jhipster-online
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TestBed, async, tick, fakeAsync, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { JhonlineTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ActivateService } from 'app/account/activate/activate.service';
import { ActivateComponent } from 'app/account/activate/activate.component';

describe('Component Tests', () => {
    describe('ActivateComponent', () => {
        let comp: ActivateComponent;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [JhonlineTestModule],
                    declarations: [ActivateComponent],
                    providers: [
                        ActivateService,
                        {
                            provide: ActivatedRoute,
                            useValue: new MockActivatedRoute({ key: 'ABC123' })
                        }
                    ]
                })
                    .overrideTemplate(ActivateComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            const fixture = TestBed.createComponent(ActivateComponent);
            comp = fixture.componentInstance;
        });

        it(
            'calls activate.get with the key from params',
            inject(
                [ActivateService],
                fakeAsync((service: ActivateService) => {
                    spyOn(service, 'get').and.returnValue(Observable.of());

                    comp.ngOnInit();
                    tick();

                    expect(service.get).toHaveBeenCalledWith('ABC123');
                })
            )
        );

        it(
            'should set set success to OK upon successful activation',
            inject(
                [ActivateService],
                fakeAsync((service: ActivateService) => {
                    spyOn(service, 'get').and.returnValue(Observable.of({}));

                    comp.ngOnInit();
                    tick();

                    expect(comp.error).toBe(null);
                    expect(comp.success).toEqual('OK');
                })
            )
        );

        it(
            'should set set error to ERROR upon activation failure',
            inject(
                [ActivateService],
                fakeAsync((service: ActivateService) => {
                    spyOn(service, 'get').and.returnValue(Observable.throw('ERROR'));

                    comp.ngOnInit();
                    tick();

                    expect(comp.error).toBe('ERROR');
                    expect(comp.success).toEqual(null);
                })
            )
        );
    });
});
